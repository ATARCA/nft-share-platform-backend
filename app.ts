import express from 'express';
import demoRouter from './routes/demoRouter';
import { unknownEndpoint, errorHandler, requestLogger } from './utils/middleware';
import { ApolloServer, gql } from 'apollo-server';

//TODO log all requests

const app = express();
app.use(express.json());

app.use('/api',requestLogger);

app.use(demoRouter);

export const initAppMiddleware = () => {
    app.use('/api',unknownEndpoint);
    app.use('/api',errorHandler);
};

export default app;