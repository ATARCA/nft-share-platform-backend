import 'jest';
import { ApolloServer } from 'apollo-server-express';
import { schemaDefs } from '../schema';
import { resolvers } from '../resolvers';
import { StoredPendingMetadataModel } from '../models/StoredPendingMetadataModel';
import { initMongoose, shutdownMongoose } from '../app';
import { web3provider } from '../web3/web3provider';

describe('add metadata integration', () => {

    let testServer: ApolloServer;

    const addMetadataQuery = `mutation AddMetadata ($pendingTxHash: String!, $metadata: String!, $signingAddress: String!, $signature: String!){
        addPendingMetadata( pendingTxHash: $pendingTxHash, metadata: $metadata, signingAddress: $signingAddress, signature: $signature ) {
          success, 
          message
        }
      }`;

    beforeAll(async () => {
        await initMongoose();

        testServer = new ApolloServer({
            typeDefs: schemaDefs,
            resolvers
        });
    });

    beforeEach( async () => {
        await StoredPendingMetadataModel.deleteMany({});
    });

    afterAll(async () => {
        await testServer.stop();
        await shutdownMongoose();
    });

    it('can save metadata with correct signature', async () => {
        const result = await testServer.executeOperation({
            query: addMetadataQuery,

            variables: {
                pendingTxHash: 'txHashIsThis',
                metadata: 'This is metadata',
                signingAddress: '0xE54BB854621E8CA08666082ABE50a9f4316469BB',
                signature: '0x0a81e08a63d33e96114f9079d9a787814e8c03dc289abf75779139d0bb8c541b12970ed7bc164dda4584799ffe02db6169330d02f9bf66ebc5e2e84dda332e3c1c'
            }
        });

        expect(result.data?.addPendingMetadata.success).toBe(true);

        const storedMetadata = await StoredPendingMetadataModel.find({});
        expect(storedMetadata).toHaveLength(1);
        expect(storedMetadata[0]).toMatchObject({ pendingTxHash: 'txHashIsThis',
            metadata: 'This is metadata',
            mintingAddress: '0xE54BB854621E8CA08666082ABE50a9f4316469BB'.toLowerCase() });
    });

    it('will not save metadata that do not match signature', async () => {
        const result = await testServer.executeOperation({
            query: addMetadataQuery,

            variables: {
                pendingTxHash: 'txHashIsThis',
                metadata: 'X This is metadata',
                signingAddress: '0xE54BB854621E8CA08666082ABE50a9f4316469BB',
                signature: '0x0a81e08a63d33e96114f9079d9a787814e8c03dc289abf75779139d0bb8c541b12970ed7bc164dda4584799ffe02db6169330d02f9bf66ebc5e2e84dda332e3c1c'
            }
        });

        expect(result.data?.addPendingMetadata.success).toBe(false);
        expect(result.data?.addPendingMetadata.message).toBeDefined();

        const storedMetadata = await StoredPendingMetadataModel.find({});
        expect(storedMetadata).toHaveLength(0);
    });

    it('cannot save the same metadata twice', async () => {
        await testServer.executeOperation({
            query: addMetadataQuery,

            variables: {
                pendingTxHash: 'txHashIsThis',
                metadata: 'This is metadata',
                signingAddress: '0xE54BB854621E8CA08666082ABE50a9f4316469BB',
                signature: '0x0a81e08a63d33e96114f9079d9a787814e8c03dc289abf75779139d0bb8c541b12970ed7bc164dda4584799ffe02db6169330d02f9bf66ebc5e2e84dda332e3c1c'
            }
        });

        const secondResult = await testServer.executeOperation({
            query: addMetadataQuery,

            variables: {
                pendingTxHash: 'txHashIsThis',
                metadata: 'This is metadata',
                signingAddress: '0xE54BB854621E8CA08666082ABE50a9f4316469BB',
                signature: '0x0a81e08a63d33e96114f9079d9a787814e8c03dc289abf75779139d0bb8c541b12970ed7bc164dda4584799ffe02db6169330d02f9bf66ebc5e2e84dda332e3c1c'
            }
        });

        expect(secondResult.data?.addPendingMetadata.success).toBe(false);
        expect(secondResult.data?.addPendingMetadata.message).toBeDefined();

        const storedMetadata = await StoredPendingMetadataModel.find({});
        expect(storedMetadata).toHaveLength(1);
    });

});