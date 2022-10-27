import { app, initMongoose, shutdownMongoose } from '../../app';
import supertest from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { StoredMetadataModel } from '../../models/StoredMetadataModel';
import { StoredConsentModel } from '../../models/StoredConsentModel';

const api = supertest(app);

describe('metadata router', () => {


    beforeEach( async () => {
        await StoredMetadataModel.deleteMany({});
        await StoredConsentModel.deleteMany({});
    });

    beforeAll( async () => {
        await initMongoose();
    });

    afterAll(async () => {
        await shutdownMongoose();
    });

    it('can return stored metadata', async () => {

        const metadata = {
            name: 'token name',
            description: 'token description'
        };

        await new StoredConsentModel({ address:'address that gave consent', consentText: 'consentText', signature: 'signature' }).save();
        await new StoredMetadataModel({ contractAddress: '0x00AA', tokenId: '22', metadata: JSON.stringify(metadata), originalTokenHolder: 'address that gave consent' }).save();

        const response = await api.get('/metadata/0x00AA/22')
            .expect(StatusCodes.OK);

        expect(response.body).toMatchObject(metadata);
    });

    it('ignores case of contract address for stored metadata', async () => {

        const metadata = {
            name: 'token name',
            description: 'token description'
        };

        await new StoredConsentModel({ address:'address that gave consent', consentText: 'consentText', signature: 'signature' }).save();
        await new StoredMetadataModel({ contractAddress: '0x00aa', tokenId: '22', metadata: JSON.stringify(metadata), originalTokenHolder: 'address that gave consent' }).save();

        const response = await api.get('/metadata/0x00AA/22')
            .expect(StatusCodes.OK);

        expect(response.body).toMatchObject(metadata);
    });

    it('returns 400 for non-existing metadata', async () => {
        await api.get('/metadata/0x00AA/22').expect(StatusCodes.BAD_REQUEST);
    });

    it('returns 403 if consent is missing', async () => {

        const metadata = {
            name: 'token name',
            description: 'token description'
        };

        await new StoredMetadataModel({ contractAddress: '0x00AA', tokenId: '22', metadata: JSON.stringify(metadata), originalTokenHolder: 'address gave no consent' }).save();

        await api.get('/metadata/0x00AA/22')
            .expect(StatusCodes.FORBIDDEN);
    });
});