import mongoose, { Document as MongooseDocumentT } from 'mongoose';

const DEFAULT_LAST_CHECKED_BLOCK_NUMBER = 0;

interface LastCheckedBlockNumber {
   blockNumber: number
}

interface LastCheckedBlockNumberDocument extends LastCheckedBlockNumber, MongooseDocumentT {}

const LastCheckedBlockNumberSchema = new mongoose.Schema<LastCheckedBlockNumberDocument>({
    blockNumber: { type: Number, required:true }
});

//set schema not to return _id and __v (version)
LastCheckedBlockNumberSchema.set('toJSON', {
    transform: (_document, returnedObject: mongoose.Document) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        returnedObject.id = returnedObject._id.toString();// eslint-disable-line @typescript-eslint/no-unsafe-assignment

        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const LastCheckedBlockNumberModel = mongoose.model<LastCheckedBlockNumberDocument>('LastCheckedBlockNumber', LastCheckedBlockNumberSchema);

export const setLastCheckedBlockNumber = async (blockNumber: number) => {
    const document = await LastCheckedBlockNumberModel.findOne({});
    if (document) {
        document.blockNumber = blockNumber;
        await document.save();
    }
    else {
        await new LastCheckedBlockNumberModel({ blockNumber }).save();
    }
};

export const getLastCheckedBlockNumber = async () => {
    const document = await LastCheckedBlockNumberModel.findOne({});
    if (document) {
        return document.blockNumber;
    }
    else {
        return DEFAULT_LAST_CHECKED_BLOCK_NUMBER;
    }

};

export const clear = async () => {
    await LastCheckedBlockNumberModel.deleteMany({});
};