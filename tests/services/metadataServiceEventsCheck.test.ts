import 'jest';
import { initMongoose, shutdownMongoose } from '../../app';
import { DeployedTokenContractModel } from '../../models/DeployedTokenContractModel';
import { StoredMetadataModel } from '../../models/StoredMetadataModel';
import { StoredPendingMetadataModel } from '../../models/StoredPendingMetadataModel';
import { checkLatestEventsAndPostMetadata } from '../../services/metadataService';
import { initWeb3Provider, web3provider } from '../../web3/web3provider';

describe('metadata update on share event', () => {

    beforeAll(async () => {
        process.env.START_BLOCK_HEIGHT = '12258810';

        await initMongoose();
        initWeb3Provider();
    });

    beforeEach( async () => {
        await StoredPendingMetadataModel.deleteMany({});
        await StoredMetadataModel.deleteMany({});

        await DeployedTokenContractModel.deleteMany({});
        await new DeployedTokenContractModel({ address: '0x3f537f5e581e11c89c0e023bc430a626c2227961', lastCheckedBlockNumber: '7843117' } ).save(); //Streamr demo project
        await new DeployedTokenContractModel({ address: '0xc2a2f67444ea2600f5dc671935bc647f9910098d', lastCheckedBlockNumber: '7843117' } ).save(); //Connecta demo project
    });

    afterAll(async () => {
        await DeployedTokenContractModel.deleteMany({});
        await shutdownMongoose();
    });

    it('moves pending metadata to permanent metadata on event', async () => {
        await new StoredPendingMetadataModel({
            metadata: 'this is metadata',
            mintingAddress: '0xA86cb4378Cdbc327eF950789c81BcBcc3aa73D21',
            pendingTxHash: '0x64a905d2d5957ca293ee9b268568e19fc52a64830771a1ed561bda30f348dfed' }).save();

        await checkLatestEventsAndPostMetadata();

        const allStoredMetada = await StoredMetadataModel.find({});

        expect(allStoredMetada).toHaveLength(1);
        expect(allStoredMetada[0]).toMatchObject({
            metadata: 'this is metadata',
            tokenId: '15',
            contractAddress: '0x3f537f5e581e11c89c0e023bc430a626c2227961'.toLowerCase(),
            originalTokenHolder: '0xBAf811debB67BF5fe7241f383192B97261F8e008'.toLowerCase()
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