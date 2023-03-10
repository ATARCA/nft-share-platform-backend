import { DeployedTokenContractDocument, DeployedShareableTokenContractModel, DeployedEndorseTokenContractModel } from '../models/DeployedTokenContractModel';
import { StoredMetadataModel } from '../models/StoredMetadataModel';
import { StoredPendingMetadata, StoredPendingMetadataModel } from '../models/StoredPendingMetadataModel';
import { GET_ALL_PROJECTS } from '../subgraph/queries/queries';
import { ProjectDetailsQuery, ProjectDetailsQuery_projects } from '../subgraph/queries/types-thegraph/ProjectDetailsQuery';
import { theGraphApolloClient } from '../subgraph/theGraphApolloClient';
import { EndorseERC721__factory, ShareableERC721__factory } from '../typechain-types';
import { TransferEvent } from '../typechain-types/ERC721Upgradeable';
import { Result } from '../types';
import { verifyMessageSafe } from '../utils/cryptography';
import { web3provider } from '../web3/web3provider';

//Infura supports only querying up to 3500 blocks from polygon network
//see https://community.infura.io/t/why-cant-we-scan-the-full-events-logs-for-polygon/4489
const MAX_BLOCKS_IN_ONE_QUERY = 2000;
const CHECK_OLD_BLOCKS_OFFSET = 1000; //do not check only latest blocks, in case the metadata was uploaded late (after minting tx was mined)

const thisIsNotAJestTest = () => {
    return process.env.JEST_WORKER_ID === undefined;
};

export const getMetadataUploadMessageToSign = (txHash: string, metadata: string): string => {
    return `Sign metadata to be uploaded \n txHash ${txHash} \n metadata ${metadata}`;
};

export const verifyMetadataSignature = (txHash: string, metadata: string, signingAddress: string, signature: string) => {
    const signedMessage = getMetadataUploadMessageToSign(txHash, metadata);
    return verifyMessageSafe(signingAddress, signedMessage, signature);
};

const addMissingContractsFromSubgraph = async () => {
    const result = await theGraphApolloClient.query<ProjectDetailsQuery, undefined>({ query: GET_ALL_PROJECTS });
    console.log('Checking contracts: addMissingContractsPromises size:'+result.data.projects.length);

    const addMissingContractsPromises = result.data.projects.map ( async project => {
        console.log(project.id+'Checking contracts: addMissingContractsPromises');
        await addMissingShareableContractsFromSubgraph(project);
        await addMissingEndorseContractsFromSubgraph(project);
    });

    await Promise.all(addMissingContractsPromises);
};

const addMissingShareableContractsFromSubgraph = async (project: ProjectDetailsQuery_projects) => {
    const shareableContractAddress = project.shareableContractAddress as string;
    const foundContracts = await DeployedShareableTokenContractModel.find({ address: shareableContractAddress });
    if (foundContracts.length === 0 && thisIsNotAJestTest()) {
        console.log(project.id+':Adding new share contract at ', shareableContractAddress);
        await new DeployedShareableTokenContractModel({ address: shareableContractAddress }).save();
    }
};

const addMissingEndorseContractsFromSubgraph = async (project: ProjectDetailsQuery_projects) => {
    if (project.endorseContractAddress) {
        const endorseContractAddress = project.endorseContractAddress as string;
        const foundContracts = await DeployedEndorseTokenContractModel.find({ address: endorseContractAddress });
        if (foundContracts.length === 0 && thisIsNotAJestTest()) {
            console.log(project.id+':Adding new endorse contract at ', endorseContractAddress);
            await new DeployedEndorseTokenContractModel({ address: endorseContractAddress }).save();
        }
    }
};

let checkEventsInProgress = false;

export const checkLatestEventsAndPostMetadata = async () => {
    await addMissingContractsFromSubgraph();

    if (checkEventsInProgress) {
        console.warn('check latest metadata already in progress - skipping');
        return;
    }

    checkEventsInProgress = true;

    try {
        const deployedContractDocuments = await DeployedShareableTokenContractModel.find({});

        const contractWorkPromises = deployedContractDocuments.map(async contractDocument => {
            await checkEventsForShareableContract(contractDocument);
        });
        await Promise.all(contractWorkPromises);
    } catch (error) {
        console.error('error when checking latest shareable contract events', error);
    }

    try {
        const deployedContractDocuments = await DeployedEndorseTokenContractModel.find({});

        const contractWorkPromises = deployedContractDocuments.map(async contractDocument => {
            await checkEventsForEndorseContract(contractDocument);
        });
        await Promise.all(contractWorkPromises);
    } catch (error) {
        console.error('error when checking latest shareable contract events', error);
    }

    checkEventsInProgress = false;
};

const checkEventsForShareableContract = async (contractDocument: DeployedTokenContractDocument & { _id: any; }) => {
    const contract = loadShareableContract(contractDocument.address);

    console.log('polling events from ' + contract.address);

    const filter = contract.filters.Transfer();//Transfer event is emited when new Token is minted
    const latestBlock = await web3provider.getBlockNumber();
    let lastCheckedBlockNumber = contractDocument.lastCheckedBlockNumber;
    let checkUpToBlock = latestBlock;
    console.log('blockheight on chain ', latestBlock);
    console.log('latest blocknumber in metadata db', lastCheckedBlockNumber);

    do {
        checkUpToBlock = latestBlock;

        if ((checkUpToBlock - lastCheckedBlockNumber) > MAX_BLOCKS_IN_ONE_QUERY) {
            checkUpToBlock = lastCheckedBlockNumber + MAX_BLOCKS_IN_ONE_QUERY;
        }

        console.log('checking from', getNextStartBlockNumberToCheck(lastCheckedBlockNumber));
        console.log('       ...to ', checkUpToBlock);
        const events = await contract.queryFilter(filter, getNextStartBlockNumberToCheck(lastCheckedBlockNumber), checkUpToBlock);
        await processEventsForNewlyMintedTokens(events);

        lastCheckedBlockNumber = checkUpToBlock;

    } while (checkUpToBlock < latestBlock);

    contractDocument.lastCheckedBlockNumber = Number(lastCheckedBlockNumber);
    await contractDocument.save();
};

const checkEventsForEndorseContract = async (contractDocument: DeployedTokenContractDocument & { _id: any; }) => {
    const contract = loadEndorseContract(contractDocument.address);

    console.log('polling events from ' + contract.address);

    const filter = contract.filters.Transfer();//Transfer event is emited when new Token is minted
    const latestBlock = await web3provider.getBlockNumber();
    let lastCheckedBlockNumber = contractDocument.lastCheckedBlockNumber;
    let checkUpToBlock = latestBlock;
    console.log('blockheight on chain ', latestBlock);
    console.log('latest blocknumber in metadata db', lastCheckedBlockNumber);

    do {
        checkUpToBlock = latestBlock;

        if ((checkUpToBlock - lastCheckedBlockNumber) > MAX_BLOCKS_IN_ONE_QUERY) {
            checkUpToBlock = lastCheckedBlockNumber + MAX_BLOCKS_IN_ONE_QUERY;
        }

        console.log('checking from', getNextStartBlockNumberToCheck(lastCheckedBlockNumber));
        console.log('       ...to ', checkUpToBlock);
        const events = await contract.queryFilter(filter, getNextStartBlockNumberToCheck(lastCheckedBlockNumber), checkUpToBlock);
        await processEventsForNewlyMintedTokens(events);

        lastCheckedBlockNumber = checkUpToBlock;

    } while (checkUpToBlock < latestBlock);

    contractDocument.lastCheckedBlockNumber = Number(lastCheckedBlockNumber);
    await contractDocument.save();
};

const getNextStartBlockNumberToCheck = (lastCheckBlockNumber: number) => {
    const nextBlockToCheck = lastCheckBlockNumber - CHECK_OLD_BLOCKS_OFFSET; //filter block start and end block numbers are inclusive on both sides of the interval
    return Math.max(nextBlockToCheck, 0);
};

const loadShareableContract = (address: string) => {
    const contract = ShareableERC721__factory.connect(address, web3provider);
    return contract;
};

const loadEndorseContract = (address: string) => {
    const contract = EndorseERC721__factory.connect(address, web3provider);
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