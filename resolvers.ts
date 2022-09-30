/* eslint-disable @typescript-eslint/no-explicit-any */
import { getConsentMessageToSign, handleAddSignedConsent, consentNeeded as handleConsentNeeded, getRevokeConsentMessageToSign, revokeSignedConsent } from './services/consentService';
import { addPendingMetadataFromClient, getMetadataUploadMessageToSign } from './services/metadataService';

export const resolvers = {
    Query: {
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
        },
        getRevokeConsentMessageToSign(_root: any, _args: any) {
            const text = getRevokeConsentMessageToSign();
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
            console.log(`addPendingMetadata: pendingTxHash ${pendingTxHash} result ${result.success} ${result.message} metadata ${metadata} signingAddress ${signingAddress} signature ${signature}`);

            return result;
        },
        async addSignedConsent(_root: any, args: any) {
            const signingAddress = args.signingAddress as string;
            const signature = args.signature as string;
            const consentText = args.consentText as string;

            const result = await handleAddSignedConsent(signingAddress, signature, consentText);
            return result;
        },
        async revokeSignedConsent(_root: any, args: any) {
            const signingAddress = args.signingAddress as string;
            const signature = args.signature as string;
            const consentText = args.consentText as string;

            const result = await revokeSignedConsent(signingAddress, signature, consentText);
            return result;
        }
    }
};