import express from 'express';
import mongoose from 'mongoose';
import demoRouter from './routes/demoRouter';
import { unknownEndpoint, errorHandler, requestLogger } from './utils/middleware';

let mongooseInitiated = false;

export const initMongoose = () => {

    if (mongooseInitiated) return;
    mongooseInitiated = true;

    const mongoDbUrl = process.env.MONGODB_URI || 'no mongo db URL provided';
    console.log('connecting to MongoDB,url:', mongoDbUrl.substring(0,37),'...');

    mongoose.connect(mongoDbUrl).then(_result => {
        console.log('connected to MongoDB');
    })
        .catch((error) => {
            console.error('error connecting to MongoDB:', error);
        });
};

export const shutdownMongoose = async () => {
    mongooseInitiated = false;

    await mongoose.disconnect();
};

initMongoose();

const app = express();
app.use(express.json());

app.use('/api',requestLogger);

app.use(demoRouter);

export const initAppMiddleware = () => {
    app.use('/api',unknownEndpoint);
    app.use('/api',errorHandler);
};

export default app;