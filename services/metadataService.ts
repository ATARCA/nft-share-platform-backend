import { verifyMessage } from '@ethersproject/wallet';

export const getMetadataUploadMessageToSign = (txHash: string, metadata: string): string => {
    return `Sign metadata to be uploaded \n txHash ${txHash} \n metadata ${metadata}`;
};

export const verifyMetadataSignature = (txHash: string, metadata: string, signingAddress: string, signature: string) => {
    const signedMessage = getMetadataUploadMessageToSign(txHash, metadata);

    try {
        const recoveredAddress = verifyMessage(signedMessage, signature).toLowerCase();
        const isSignerMatching = !!(recoveredAddress === signingAddress.toLowerCase());
        return isSignerMatching;
    } catch (error) {
        console.warn(`verifyMetadataSignature error for signature ${signature} and signed message ${signedMessage}`,error);
        return false;
    }
};