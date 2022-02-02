import express from 'express';
import demoRouter from './routes/demoRouter';
import { unknownEndpoint, errorHandler } from './utils/middleware';

const app = express();
app.use(express.json());


app.use(demoRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

