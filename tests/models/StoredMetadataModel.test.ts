import { initMongoose, shutdownMongoose } from '../../app';
import { StoredMetadataModel } from '../../models/StoredMetadataModel';

describe('StoredMetadataModel test', () => {

    beforeAll(async () => {
        await initMongoose();
    });

    afterAll(async () => {
        await shutdownMongoose();
    });

    beforeEach(async () => {
        await StoredMetadataModel.deleteMany({});
    });

    it('can save value', async () => {
        const values = {
            metadata: 'this is metadata',
            tokenId: '1',
            contractAddress: '0x8f9a72d9E9D66dD330Cf669F143B14f4EfCd6A4D'.toLowerCase(),
            originalTokenHolder: 'address'
        };
        await new StoredMetadataModel(values ).save();

        const documents = await StoredMetadataModel.find({});
        expect(documents).toHaveLength(1);
        expect(documents[0]).toMatchObject(values);
    });

    it('enforces unique combination of tokenId and contractAddress', async () => {
        const values = {
            metadata: 'this is metadata',
            tokenId: '1',
            contractAddress: '0x8f9a72d9E9D66dD330Cf669F143B14f4EfCd6A4D',
            originalTokenHolder: 'address'
        };

        await new StoredMetadataModel( values ).save();

        let exceptionThrown = false;
        try {
            await new StoredMetadataModel( values ).save();

        } catch (error) {
            exceptionThrown = true;
        }

        expect(exceptionThrown).toBe(true);
    });

    it('enforces lower case for addresses', async () => {
        const values = {
            metadata: 'this is Metadata',
            tokenId: '1',
            contractAddress: '0x8f9a72d9E9D66dD330Cf669F143B14f4EfCd6A4D',
            originalTokenHolder: 'Address'
        };

        const valuesLowerCase = {
            metadata: 'this is Metadata',
            tokenId: '1',
            contractAddress: '0x8f9a72d9E9D66dD330Cf669F143B14f4EfCd6A4D'.toLowerCase(),
            originalTokenHolder: 'Address'.toLowerCase()
        };

        await new StoredMetadataModel( values ).save();

        const documents = await StoredMetadataModel.find({});

        expect(documents[0]).toMatchObject(valuesLowerCase);
    });

    it('can save metadata for different tokens on the same contract', async () => {
        const values1 = {
            metadata: 'this is metadata',
            tokenId: '1',
            contractAddress: '0x8f9a72d9E9D66dD330Cf669F143B14f4EfCd6A4D',
            originalTokenHolder: 'address'
        };

        const values2 = {
            metadata: 'this is metadata',
            tokenId: '2',
            contractAddress: '0x8f9a72d9E9D66dD330Cf669F143B14f4EfCd6A4D',
            originalTokenHolder: 'address'
        };

        await new StoredMetadataModel( values1 ).save();
        await new StoredMetadataModel( values2 ).save();

        const documents = await StoredMetadataModel.find({});
        expect(documents).toHaveLength(2);
    });

    it('can save metadata for same tokens id on different contracts', async () => {
        const values1 = {
            metadata: 'this is metadata',
            tokenId: '1',
            contractAddress: '0x8f9a72d9E9D66dD330Cf669F143B14f4EfCd6A4D',
            originalTokenHolder: 'address'
        };

        const values2 = {
            metadata: 'this is metadata',
            tokenId: '1',
            contractAddress: '0xAf9a72d9E9D66dD330Cf669F143B14f4EfCd6A4D',
            originalTokenHolder: 'address'
        };

        await new StoredMetadataModel( values1 ).save();
        await new StoredMetadataModel( values2 ).save();

        const documents = await StoredMetadataModel.find({});
        expect(documents).toHaveLength(2);
    });

});