import 'jest';
import { initMongoose, shutdownMongoose } from '../../app';
import { DeployedTokenContractModel } from '../../models/DeployedTokenContractModel';
import { StoredMetadataModel } from '../../models/StoredMetadataModel';
import { StoredPendingMetadataModel } from '../../models/StoredPendingMetadataModel';
import { checkLatestEventsAndPostMetadata } from '../../services/metadataService';
import { initWeb3Provider, web3provider } from '../../web3/web3provider';

describe('metadata update on share event', () => {

    beforeAll(async () => {
        await initMongoose();
        initWeb3Provider();

        await DeployedTokenContractModel.deleteMany({});
        await new DeployedTokenContractModel({ address: '0x8f9a72d9E9D66dD330Cf669F143B14f4EfCd6A4D' } ).save();
    });

    beforeEach( async () => {
        await StoredPendingMetadataModel.deleteMany({});
        await StoredMetadataModel.deleteMany({});
    });

    afterAll(async () => {
        await web3provider.destroy();
        await shutdownMongoose();
    });

    it('moves pending metadata to permanent metadata on event', async () => {
        await new StoredPendingMetadataModel({
            metadata: 'this is metadata',
            pendingTxHash: '0x83ea84f850329e67646d4c641735ff5aab66535e14552a855f28fc5648d8c724' }).save();

        await checkLatestEventsAndPostMetadata();

        const allStoredMetada = await StoredMetadataModel.find({});

        expect(allStoredMetada).toHaveLength(1);
        expect(allStoredMetada[0]).toMatchObject({
            metadata: 'this is metadata',
            tokenId: '1',
            contractAddress: '0x8f9a72d9E9D66dD330Cf669F143B14f4EfCd6A4D',
            originalTokenHolder: '0xA86cb4378Cdbc327eF950789c81BcBcc3aa73D21'
        });
    });

});