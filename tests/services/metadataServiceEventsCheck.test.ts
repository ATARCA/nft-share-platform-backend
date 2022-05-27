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
    });

    beforeEach( async () => {
        await StoredPendingMetadataModel.deleteMany({});
        await StoredMetadataModel.deleteMany({});

        await DeployedTokenContractModel.deleteMany({});
        await new DeployedTokenContractModel({ address: '0x4381dbc9b27b035f87a04995400879cd6e977aed' } ).save();
    });

    afterAll(async () => {
        await DeployedTokenContractModel.deleteMany({});
        await web3provider.destroy();
        await shutdownMongoose();
    });

    it('moves pending metadata to permanent metadata on event', async () => {
        await new StoredPendingMetadataModel({
            metadata: 'this is metadata',
            mintingAddress: '0xbaf811debb67bf5fe7241f383192b97261f8e008',
            pendingTxHash: '0x7f63615070dedb683c3e8b1b7b8a16757e333ba2769779fdba3f3c9f7be66722' }).save();

        await checkLatestEventsAndPostMetadata();

        const allStoredMetada = await StoredMetadataModel.find({});

        expect(allStoredMetada).toHaveLength(1);
        expect(allStoredMetada[0]).toMatchObject({
            metadata: 'this is metadata',
            tokenId: '15',
            contractAddress: '0x4381dBc9b27B035f87a04995400879Cd6e977AED'.toLowerCase(),
            originalTokenHolder: '0x074f64B76fD5C83A9e0590c09BCd7D2B6FE3c1fD'.toLowerCase()
        });
    });

    it('pending metadata from different address are not moved', async () => {

        await new StoredPendingMetadataModel({
            metadata: 'this is metadata',
            mintingAddress: '0xbbf811debb67bf5fe7241f383192b97261f8e008',
            pendingTxHash: '0x7f63615070dedb683c3e8b1b7b8a16757e333ba2769779fdba3f3c9f7be66722' }).save();

        await checkLatestEventsAndPostMetadata();

        const allStoredMetada = await StoredMetadataModel.find({});

        expect(allStoredMetada).toHaveLength(0);
    });

});