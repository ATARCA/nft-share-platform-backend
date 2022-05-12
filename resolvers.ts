/* eslint-disable @typescript-eslint/no-explicit-any */
import { StoredPendingMetadata, StoredPendingMetadataModel } from './models/StoredPendingMetadataModel';
import { getConsentMessageToSign, addSignedConsent as handleAddSignedConsent, consentNeeded as handleConsentNeeded } from './services/consentService';
import { multiply } from './services/demoService';
import { addPendingMetadataFromClient, getMetadataUploadMessageToSign, verifyMetadataSignature } from './services/metadataService';
import { MultiplyPayloadDemo, Result } from './types';

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
        },
        async consentNeeded(_root: any, args: any) {
            const address = args.address as string;
            return await handleConsentNeeded(address);

        },
        getConsentMessageToSign(_root: any, _args: any) {
            const text = getConsentMessageToSign();
            return text;
        }
    },
    Mutation: {
        async addPendingMetadata(_root: any, args: any) {
            const pendingTxHash = args.pendingTxHash as string;
            const metadata = args.metadata as string;
            const signingAddress = args.signingAddress as string;
            const signature = args.signature as string;

            const result = await addPendingMetadataFromClient(pendingTxHash, metadata, signingAddress, signature);
            return result;
        },
        async addSignedConsent(_root: any, args: any) {
            const signingAddress = args.signingAddress as string;
            const signature = args.signature as string;
            const consentText = args.consentText as string;

            const result = await handleAddSignedConsent(signingAddress, signature, consentText);
            return result;
        }
    }
};