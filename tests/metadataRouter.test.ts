import { app, initMongoose, shutdownMongoose } from '../app';
import supertest from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { StoredMetadataModel } from '../models/StoredMetadataModel';
import { web3provider } from '../web3/web3provider';

const api = supertest(app);

describe('metadata router', () => {


    /*   beforeEach(() => {

    });

    afterEach(() => {

    });*/

    beforeAll( async () => {
        await initMongoose();
    });

    afterAll(async () => {
        await web3provider.destroy();
        await shutdownMongoose();
    });

    it('can return stored metadata', async () => {
        await StoredMetadataModel.deleteMany({});

        const metadata = {
            name: 'token name',
            description: 'token description'
        };

        await new StoredMetadataModel({ contractAddress: '0x00AA', tokenId: '22', metadata: JSON.stringify(metadata) }).save();
        const response = await api.get('/metadata/0x00AA/22')
            .expect(StatusCodes.OK);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        //const body = response.body;
        expect(response.body).toMatchObject(metadata);
    });
});