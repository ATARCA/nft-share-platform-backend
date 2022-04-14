import mongoose, { Document as MongooseDocumentT } from 'mongoose';

export interface DeployedTokenContract {
   address: string,
   lastCheckedBlockNumber: number
}

export interface DeployedTokenContractDocument extends DeployedTokenContract, MongooseDocumentT {}

const DeployedTokenContractSchema = new mongoose.Schema<DeployedTokenContractDocument>({
    address: { type: String, required:true, unique: true },
    lastCheckedBlockNumber: { type: Number, required:true, default: 0 }
});

//set schema not to return _id and __v (version)
DeployedTokenContractSchema.set('toJSON', {
    transform: (_document, returnedObject: mongoose.Document) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        returnedObject.id = returnedObject._id.toString();// eslint-disable-line @typescript-eslint/no-unsafe-assignment

        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

export const DeployedTokenContractModel = mongoose.model<DeployedTokenContractDocument>('DeployedTokenContract', DeployedTokenContractSchema);
