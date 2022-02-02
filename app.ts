import express from 'express';
import demoRouter from './routes/demoRouter';
import { unknownEndpoint, errorHandler, requestLogger } from './utils/middleware';

const app = express();
app.use(express.json());

app.use(requestLogger);

app.use(demoRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;