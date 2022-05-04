import mongoose, { Document as MongooseDocumentT } from 'mongoose';

export interface StoredMetadata {
   metadata: string,
   tokenId: string,
   contractAddress: string}

export interface StoredMetadataDocument extends StoredMetadata, MongooseDocumentT {}

const StoredMetadataSchema = new mongoose.Schema<StoredMetadataDocument>({
    metadata: { type: String, required:true },
    tokenId: { type: String, required:true },
    contractAddress: { type: String, required:true },
});

StoredMetadataSchema.index({ 'tokenId': 1, 'contractAddress': 1 }, { 'unique': true });//unique combination of two fields

//set schema not to return _id and __v (version)
StoredMetadataSchema.set('toJSON', {
    transform: (_document, returnedObject: mongoose.Document) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        returnedObject.id = returnedObject._id.toString();// eslint-disable-line @typescript-eslint/no-unsafe-assignment

        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

export const StoredMetadataModel = mongoose.model<StoredMetadataDocument>('StoredMetadata', StoredMetadataSchema);
