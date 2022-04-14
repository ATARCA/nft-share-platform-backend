import express from 'express';
import mongoose from 'mongoose';
import demoRouter from './routes/demoRouter';
import { checkLatestEventsAndPostMetadata } from './services/metadataService';
import { unknownEndpoint, errorHandler, requestLogger } from './utils/middleware';

let mongooseInitiated = false;

const isJestTest = () => {
    return process.env.JEST_WORKER_ID !== undefined;
};

export const initMongoose = async () => {

    if (mongooseInitiated) return;
    mongooseInitiated = true;

    const mongoDbUrl = process.env.MONGODB_URI || 'no mongo db URL provided';
    console.log('connecting to MongoDB,url:', mongoDbUrl.substring(0,37),'...');

    try {
        await mongoose.connect(mongoDbUrl);
        console.log('connected to MongoDB');
    } catch (error) {
        console.error('error connecting to MongoDB:', error);
    }
};

export const shutdownMongoose = async () => {
    mongooseInitiated = false;

    await mongoose.disconnect();
};

if (!isJestTest()) {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    initMongoose().then(() => {}).catch( e => console.error('mongoose error', e));
}

if (!isJestTest()) {
    checkLatestEventsAndPostMetadata()
        .catch((error) => {
            console.error('metadata update error', error);
        });
}

const app = express();
app.use(express.json());

app.use('/api',requestLogger);

app.use(demoRouter);

export const initAppMiddleware = () => {
    app.use('/api',unknownEndpoint);
    app.use('/api',errorHandler);
};

export default app;