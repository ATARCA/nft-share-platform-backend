import express from 'express';
import demoRouter from './routes/demoRouter';
import { unknownEndpoint, errorHandler, requestLogger } from './utils/middleware';

const app = express();
app.use(express.json());

app.use('/api',requestLogger);

app.use(demoRouter);

export const initAppMiddleware = () => {
    app.use('/api',unknownEndpoint);
    app.use('/api',errorHandler);
};

export default app;