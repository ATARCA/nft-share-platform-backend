import { verifyMessage } from '@ethersproject/wallet';

export const verifyMessageSafe = (signingAddress: string, signedMessage: string, signature: string) : boolean => {
    try {
        const recoveredAddress = verifyMessage(signedMessage, signature).toLowerCase();
        const isSignerMatching = !!(recoveredAddress === signingAddress.toLowerCase());
        return isSignerMatching;
    } catch (error) {
        console.warn(`verifyMessageChecked error for signature ${signature} and signed message ${signedMessage}`,error);
        return false;
    }
};