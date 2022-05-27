import mongoose, { Document as MongooseDocumentT } from 'mongoose';

export interface StoredPendingMetadata {
   metadata: string,
   mintingAddress: string,
   pendingTxHash: string}

export interface StoredPendingMetadataDocument extends StoredPendingMetadata, MongooseDocumentT {}

const storedPendingMetadataSchema = new mongoose.Schema<StoredPendingMetadataDocument>({
    metadata: { type: String, required:true },
    mintingAddress: { type: String, lowercase: true, required:true },
    pendingTxHash: { type: String, required:true, unique: true } });

storedPendingMetadataSchema.index({ 'mintingAddress': 1, 'pendingTxHash': 1 }, { 'unique': true });//unique combination of two fields

//set schema not to return _id and __v (version)
storedPendingMetadataSchema.set('toJSON', {
    transform: (_document, returnedObject: mongoose.Document) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        returnedObject.id = returnedObject._id.toString();// eslint-disable-line @typescript-eslint/no-unsafe-assignment

        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

export const StoredPendingMetadataModel = mongoose.model<StoredPendingMetadataDocument>('StoredPendingMetadata', storedPendingMetadataSchema);
