import { DeployedTokenContractModel } from '../models/DeployedTokenContractModel';
import { StoredMetadataModel } from '../models/StoredMetadataModel';
import { StoredPendingMetadata, StoredPendingMetadataModel } from '../models/StoredPendingMetadataModel';
import { ShareableERC721__factory } from '../typechain-types';
import { TransferEvent } from '../typechain-types/ERC721';
import { Result } from '../types';
import { verifyMessageSafe } from '../utils/cryptography';
import { web3provider } from '../web3/web3provider';

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
        await new DeployedTokenContractModel({ address: '0x4381dBc9b27B035f87a04995400879Cd6e977AED' } ).save();
    }
};

export const checkLatestEventsAndPostMetadata = async () => {
    console.log('polling events');

    await initiateStoredContractsIfEmpty();

    const deployedContractDocuments = await DeployedTokenContractModel.find({});

    const contractWorkPromises = deployedContractDocuments.map(async contractDocument => {
        const contract = loadContract(contractDocument.address);
        const filter = contract.filters.Transfer();//Transfer event is emited when new Token is minted

        const latestBlock = await web3provider.getBlockNumber();
        const lastCheckedBlockNumber = contractDocument.lastCheckedBlockNumber;
        const events = await contract.queryFilter(filter, getNextBlockNumberToCheck(lastCheckedBlockNumber), latestBlock);
        await processEventsForNewlyMintedTokens(events);
        contractDocument.lastCheckedBlockNumber = latestBlock;
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
                console.log('storing metadata', { metadata: pendingMetadata.metadata, tokenId, contractAddress, originalTokenHolder, transactionHash: event.transactionHash });
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