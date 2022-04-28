/* eslint-disable @typescript-eslint/no-explicit-any */
import { StoredPendingMetadata, StoredPendingMetadataModel } from './models/StoredPendingMetadataModel';
import { multiply } from './services/demoService';
import { getMetadataUploadMessageToSign, verifyMetadataSignature } from './services/metadataService';
import { MultiplyPayloadDemo } from './types';

export const resolvers = {
    Query: {
        allBooks: () => {
            const mockBooks =[
                { title: 'title1', author: 'author1' },
                { title: 'title2', author: 'author2' }
            ];
            return mockBooks;
        },
        multiply(_root: any, args: any) {
            const payload: MultiplyPayloadDemo = { value1: args.value1 as number, value2: args.value2 as number };
            const result = multiply(payload);
            const resultObject = { value: result };
            return resultObject;
        },
        getMetadataUploadMessageToSign(_root: any, args: any) {
            const txHash = args.txHash as string;
            const metadata = args.metadata as string;
            const messageToSign = getMetadataUploadMessageToSign(txHash, metadata);
            return messageToSign;
        }
    },
    Mutation: {
        async addPendingMetadata(_root: any, args: any) {
            const pendingTxHash = args.pendingTxHash as string;
            const metadata = args.metadata as string;
            const signingAddress = args.signingAddress as string;
            const signature = args.signature as string;

            const existingRecord = await StoredPendingMetadataModel.findOne({ pendingTxHash });
            if (existingRecord) {
                const result = { success: false, message: `Pending metadata for txHash ${pendingTxHash} already exist` };
                return result;
            }

            const signatureValid = verifyMetadataSignature(pendingTxHash, metadata, signingAddress, signature);

            if (signatureValid) {
                const metadataRecord: StoredPendingMetadata = { metadata, pendingTxHash };
                await new StoredPendingMetadataModel(metadataRecord).save();
                const result = { success: true };
                return result;
            }
            else {
                const result = { success: false, message: 'Signature validation failed' };
                return result;
            }
        }
    }
};