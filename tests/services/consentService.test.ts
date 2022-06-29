/* eslint-disable @typescript-eslint/no-unused-vars */
import 'jest';
import { ApolloServer } from 'apollo-server-express';
import { schemaDefs } from '../../schema';
import { resolvers } from '../../resolvers';
import { StoredPendingMetadataModel } from '../../models/StoredPendingMetadataModel';
import { initMongoose, shutdownMongoose } from '../../app';
import { web3provider } from '../../web3/web3provider';
import { StoredConsentModel } from '../../models/StoredConsentModel';

describe('consent service', () => {

    let testServer: ApolloServer;

    const expectedConsentText = 'Consent text comes here.';

    const getConsentTextQuery = `query GetConsentMessageToSign {
        getConsentMessageToSign 
      }`;

    const addSignedConsentQuery = `mutation AddSignedConsent ($signingAddress: String!, $signature: String!, $consentText: String!){
        addSignedConsent( signingAddress: $signingAddress, signature: $signature, consentText: $consentText ) {
          success, 
          message
        }
      }`;

    const consentNeededQuery = `query ConsentNeededQuery ($address: String!){
      consentNeeded(address: $address) 
    }
    `;

    beforeAll(async () => {
        process.env.CONSENT_TEXT = expectedConsentText;

        await initMongoose();

        testServer = new ApolloServer({
            typeDefs: schemaDefs,
            resolvers
        });
    });

    beforeEach( async () => {
        await StoredPendingMetadataModel.deleteMany({});
        await StoredConsentModel.deleteMany({});
    });

    afterAll(async () => {
        await testServer.stop();
        await shutdownMongoose();
        await web3provider.destroy();
    });

    it('returns set consent text', async () => {
        const expectedText = 'Consent text';
        const originalText = process.env.CONSENT_TEXT;


        process.env.CONSENT_TEXT = expectedText;

        const result = await testServer.executeOperation({
            query: getConsentTextQuery,

            variables: {
            }
        });

        process.env.CONSENT_TEXT = originalText;

        expect(result.data?.getConsentMessageToSign).toBe(expectedText);
    });

    it('throws when no consent text is set', async () => {
        const originalEnv = process.env;
        const originalText = process.env.CONSENT_TEXT;

        delete originalEnv.CONSENT_TEXT;

        process.env = originalEnv;

        const result = await testServer.executeOperation({
            query: getConsentTextQuery,

            variables: {
            }
        });

        process.env.CONSENT_TEXT = originalText;

        expect(result.data).toBeNull();
        expect(result.errors).toBeDefined();
    });

    it('fails when consent text is different than required', async () => {
        process.env.CONSENT_TEXT = 'different text';

        const consentText = 'Consent text comes here.';
        const signingAddress = '0xA86cb4378Cdbc327eF950789c81BcBcc3aa73D21';
        const signature = '0x419c5d7085d8d6dd54b0cf55f673c14de4cb9444db1ef66ba37cffd3f73eb81564593d1ebe1257a4b524a8691b6414b264e5cd1b1691439898d8da17993e8f511c';

        const addConsentResult = await testServer.executeOperation({
            query: addSignedConsentQuery,

            variables: {
                signingAddress,
                signature,
                consentText
            }
        });

        expect(addConsentResult.data?.addSignedConsent.success).toBe(false);

        process.env.CONSENT_TEXT = expectedConsentText;

        const allConsents = await StoredConsentModel.find({});
        expect(allConsents).toHaveLength(0);
    });

    it('gives consent needed true for new address', async () => {
        const result = await testServer.executeOperation({
            query: consentNeededQuery,

            variables: {
                address: 'new address'
            }
        });

        expect(result.data?.consentNeeded).toBe(true);
    });

    it('gives consent needed false for existing address consent', async () => {

        await new StoredConsentModel({ address:'existing address', consentText: 'consentText', signature: 'signature' }).save();

        const result = await testServer.executeOperation({
            query: consentNeededQuery,

            variables: {
                address: 'existing address'
            }
        });

        expect(result.data?.consentNeeded).toBe(false);
    });

    it ('stores new consent with correct signature', async () => {
        const consentText = 'Consent text comes here.';
        const signingAddress = '0xA86cb4378Cdbc327eF950789c81BcBcc3aa73D21';
        const signature = '0x419c5d7085d8d6dd54b0cf55f673c14de4cb9444db1ef66ba37cffd3f73eb81564593d1ebe1257a4b524a8691b6414b264e5cd1b1691439898d8da17993e8f511c';

        const addConsentResult = await testServer.executeOperation({
            query: addSignedConsentQuery,

            variables: {
                signingAddress,
                signature,
                consentText
            }
        });

        expect(addConsentResult.data?.addSignedConsent.success).toBe(true);

        const allConsents = await StoredConsentModel.find({});
        expect(allConsents).toHaveLength(1);
        expect(allConsents[0]).toMatchObject({ address: signingAddress.toLowerCase(), consentText, signature });

        const consentNeededresult = await testServer.executeOperation({
            query: consentNeededQuery,

            variables: {
                address: signingAddress
            }
        });

        expect(consentNeededresult.data?.consentNeeded).toBe(false);
    });

    it ('does not store consent with incorrect signature', async () => {
        const consentText = 'Consent text comes here.';
        const signingAddress = '0xA86cb4378Cdbc327eF950789c81BcBcc3aa73D21';
        const signature = '0x319c5d7085d8d6dd54b0cf55f673c14de4cb9444db1ef66ba37cffd3f73eb81564593d1ebe1257a4b524a8691b6414b264e5cd1b1691439898d8da17993e8f511c';

        const result = await testServer.executeOperation({
            query: addSignedConsentQuery,

            variables: {
                signingAddress,
                signature,
                consentText
            }
        });

        expect(result.data?.addSignedConsent.success).toBe(false);
        expect(result.data?.addSignedConsent.message).toBeDefined();

        const allConsents = await StoredConsentModel.find({});
        expect(allConsents).toHaveLength(0);

        const consentNeededresult = await testServer.executeOperation({
            query: consentNeededQuery,

            variables: {
                address: signingAddress
            }
        });

        expect(consentNeededresult.data?.consentNeeded).toBe(true);
    });

    it ('does not store the same consent twice', async () => {
        const consentText = 'Consent text comes here.';
        const signingAddress = '0xA86cb4378Cdbc327eF950789c81BcBcc3aa73D21';
        const signature = '0x419c5d7085d8d6dd54b0cf55f673c14de4cb9444db1ef66ba37cffd3f73eb81564593d1ebe1257a4b524a8691b6414b264e5cd1b1691439898d8da17993e8f511c';

        const _addConsentResult1 = await testServer.executeOperation({
            query: addSignedConsentQuery,

            variables: {
                signingAddress,
                signature,
                consentText
            }
        });

        const addConsentResult2 = await testServer.executeOperation({
            query: addSignedConsentQuery,

            variables: {
                signingAddress,
                signature,
                consentText
            }
        });

        expect(addConsentResult2.data?.addSignedConsent.success).toBe(false);
        expect(addConsentResult2.data?.addSignedConsent.message).toBeDefined();

        const allConsents = await StoredConsentModel.find({});
        expect(allConsents).toHaveLength(1);
        expect(allConsents[0]).toMatchObject({ address: signingAddress.toLowerCase(), consentText, signature });

        const consentNeededresult = await testServer.executeOperation({
            query: consentNeededQuery,

            variables: {
                address: signingAddress
            }
        });

        expect(consentNeededresult.data?.consentNeeded).toBe(false);
    });
});