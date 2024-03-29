import { Result } from '../types';
import { verifyMessageSafe } from '../utils/cryptography';
import { StoredConsentModel } from '../models/StoredConsentModel';

export const getConsentMessageToSign = () => {
    const text = process.env.CONSENT_TEXT;
    if (text) return text;
    else throw new Error('CONSENT_TEXT variable not set');
};

export const getRevokeConsentMessageToSign = () => {
    const text = process.env.REVOKE_CONSENT_TEXT;
    if (text) return text;
    else throw new Error('REVOKE_CONSENT_TEXT variable not set');
};

export const handleAddSignedConsent = async (signingAddress: string, signature: string, consentText: string): Promise<Result> => {

    if (consentText !== getConsentMessageToSign()) {
        return { success: false, message: 'Consent text does not match current consent' };
    }

    const signatureMatch = verifyMessageSafe(signingAddress,consentText, signature);

    if (signatureMatch) {
        if (await consentNeeded(signingAddress)) {
            await new StoredConsentModel({ address:signingAddress, consentText, signature }).save();
            return { success: true };
        }
        else {
            return { success: false, message: 'Consent for this address already exists' };
        }
    }
    else {
        return { success: false, message: 'Signature is not matching consent and address' };
    }

};

export const revokeSignedConsent = async (signingAddress: string, signature: string, consentText: string): Promise<Result> => {

    if (consentText !== getRevokeConsentMessageToSign()) {
        return { success: false, message: 'Consent text does not match current consent' };
    }

    const signatureMatch = verifyMessageSafe(signingAddress,consentText, signature);

    if (signatureMatch) {
        if (await consentExists(signingAddress)) {
            await StoredConsentModel.deleteMany({ address: signingAddress });
            return { success: true };
        }
        else {
            return { success: false, message: 'Consent for this address does not exists' };
        }
    }
    else {
        return { success: false, message: 'Signature is not matching consent and address' };
    }

};

export const consentNeeded = async (address: string) => {
    const result = await StoredConsentModel.findOne({ address });

    if (result) return false;
    else return true;
};

export const consentExists = async (address: string) => {
    return ! await consentNeeded(address);
};