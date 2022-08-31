import { DeployedTokenContractModel } from '../models/DeployedTokenContractModel';
import { StoredMetadataModel } from '../models/StoredMetadataModel';
import { StoredPendingMetadata, StoredPendingMetadataModel } from '../models/StoredPendingMetadataModel';
import { ShareableERC721__factory } from '../typechain-types';
import { TransferEvent } from '../typechain-types/ERC721Upgradeable';
import { Result } from '../types';
import { verifyMessageSafe } from '../utils/cryptography';
import { web3provider } from '../web3/web3provider';

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || '0xD7BB5c81056Ae9DA36c965F27f052C86aB9bCEC4';

export const getMetadataUploadMessageToSign = (txHash: string, metadata: string): string => {
    return `Sign metadata to be uploaded \n txHash ${txHash} \n metadata ${metadata}`;
};

export const verifyMetadataSignature = (txHash: string, metadata: string, signingAddress: string, signature: string) => {
    const signedMessage = getMetadataUploadMessageToSign(txHash, metadata);
    return verifyMessageSafe(signingAddress, signedMessage, signature);
};

const initiateStoredContractsIfEmpty = async () => {
    const contracts = await DeployedTokenContractModel.find({});
    if (contracts.length === 0) {
        await new DeployedTokenContractModel({ address: CONTRACT_ADDRESS } ).save();
    }
};

export const checkLatestEventsAndPostMetadata = async () => {
    console.log('polling events from ' + CONTRACT_ADDRESS);
    await initiateStoredContractsIfEmpty();

    const deployedContractDocuments = await DeployedTokenContractModel.find({});

    const contractWorkPromises = deployedContractDocuments.map(async contractDocument => {
        const contract = loadContract(contractDocument.address);
        const filter = contract.filters.Transfer();//Transfer event is emited when new Token is minted
        const latestBlock = await web3provider.getBlockNumber();
        const lastCheckedBlockNumber = contractDocument.lastCheckedBlockNumber;
        var checkUpToBlock = latestBlock;
        console.log('blockheight on chain ', latestBlock)
        console.log('latest blocknumber in metadata db', lastCheckedBlockNumber)
        //Todo: proceed in increments of 3000 if the difference of blocks is greater than 3000
        //Magic number, Infura supports only querying up to 3500 blocks from polygon network
        if ((latestBlock - lastCheckedBlockNumber) > 2000) {
            checkUpToBlock = lastCheckedBlockNumber + 2000;
        }
        console.log('checking from', getNextBlockNumberToCheck(lastCheckedBlockNumber))
        console.log('       ...to ', checkUpToBlock)

        const events = await contract.queryFilter(filter, getNextBlockNumberToCheck(lastCheckedBlockNumber), checkUpToBlock);
        await processEventsForNewlyMintedTokens(events);
        contractDocument.lastCheckedBlockNumber = Number(checkUpToBlock);
        await contractDocument.save();
    });

    await Promise.all(contractWorkPromises);
};

const checkBlockNumberOffset = 1000; //do not check only latest blocks, in case the metadata was uploaded late (after minting tx was mined)

const getNextBlockNumberToCheck = (lastCheckBlockNumber: number) => {
    const nextBlockToCheck = lastCheckBlockNumber - checkBlockNumberOffset; //filter block start and end block numbers are inclusive on both sides of the interval
    return Math.max(nextBlockToCheck, 0);
};

const loadContract = (address: string) => {
    const contract = ShareableERC721__factory.connect(address, web3provider);
    return contract;
};

const processEventsForNewlyMintedTokens = async (events: TransferEvent[]) => {
    const promises = events.map( async (event) => {
        const transactionReceipt = await web3provider.getTransactionReceipt(event.transactionHash);
        const mintingAddress = transactionReceipt.from.toLowerCase();

        const pendingMetadata = await StoredPendingMetadataModel.findOne({ pendingTxHash:event.transactionHash, mintingAddress });
        if (pendingMetadata) {
            const tokenId = event.args.tokenId.toBigInt().toString();
            const contractAddress = event.address;
            const originalTokenHolder = event.args.to;
            const existingMetadata = await StoredMetadataModel.find({ tokenId, contractAddress });

            if (existingMetadata.length === 0) {
                console.log('storing metadata',  { metadata: pendingMetadata.metadata, tokenId, contractAddress, originalTokenHolder, transactionHash: event.transactionHash });
                await new StoredMetadataModel({ metadata: pendingMetadata.metadata, tokenId, contractAddress, originalTokenHolder } ).save();
            }
            else {
                console.log('metadata already stored for ', { tokenId, contractAddress });
            }
        }
    });

    await Promise.all(promises);
};

export const addPendingMetadataFromClient = async (pendingTxHash: string, metadata: string, signingAddress: string, signature: string): Promise<Result> => {
    const existingRecord = await StoredPendingMetadataModel.findOne({ pendingTxHash });
    if (existingRecord) {
        const result = { success: false, message: `Pending metadata for txHash ${pendingTxHash} already exist` };
        return result;
    }

    const signatureValid = verifyMetadataSignature(pendingTxHash, metadata, signingAddress, signature);

    if (signatureValid) {
        const metadataRecord: StoredPendingMetadata = { metadata, pendingTxHash, mintingAddress: signingAddress.toLowerCase() };
        await new StoredPendingMetadataModel(metadataRecord).save();
        const result: Result = { success: true };
        return result;
    }
    else {
        const result: Result = { success: false, message: 'Signature validation failed' };
        return result;
    }
};