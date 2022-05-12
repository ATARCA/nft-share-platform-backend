import mongoose, { Document as MongooseDocumentT } from 'mongoose';

export interface StoredConsent {
   address: string,
   consentText: string,
   signature: string}

export interface StoredConsentDocument extends StoredConsent, MongooseDocumentT {}

const StoredConsentSchema = new mongoose.Schema<StoredConsentDocument>({
    address: { type: String, required:true, unique: true },
    consentText: { type: String, required:true },
    signature: { type: String, required:true },
});

//set schema not to return _id and __v (version)
StoredConsentSchema.set('toJSON', {
    transform: (_document, returnedObject: mongoose.Document) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        returnedObject.id = returnedObject._id.toString();// eslint-disable-line @typescript-eslint/no-unsafe-assignment

        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

export const StoredConsentModel = mongoose.model<StoredConsentDocument>('StoredConsent', StoredConsentSchema);
