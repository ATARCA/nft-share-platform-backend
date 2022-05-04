import { app, initMongoose, shutdownMongoose } from '../../app';
import supertest from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { StoredMetadataModel } from '../../models/StoredMetadataModel';
import { web3provider } from '../../web3/web3provider';

const api = supertest(app);

describe('metadata router', () => {


    beforeEach( async () => {
        await StoredMetadataModel.deleteMany({});

    });

    beforeAll( async () => {
        await initMongoose();
    });

    afterAll(async () => {
        await web3provider.destroy();
        await shutdownMongoose();
    });

    it('can return stored metadata', async () => {

        const metadata = {
            name: 'token name',
            description: 'token description'
        };

        await new StoredMetadataModel({ contractAddress: '0x00AA', tokenId: '22', metadata: JSON.stringify(metadata) }).save();
        const response = await api.get('/metadata/0x00AA/22')
            .expect(StatusCodes.OK);

        expect(response.body).toMatchObject(metadata);
    });

    it('returns 400 for non-existing metadata', async () => {

        const metadata = {
            name: 'token name',
            description: 'token description'
        };

        await new StoredMetadataModel({ contractAddress: '0x00AA', tokenId: '01', metadata: JSON.stringify(metadata) }).save();

        await api.get('/metadata/0x00AA/22').expect(StatusCodes.BAD_REQUEST);

    });
});