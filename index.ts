import express from 'express';
import demoRouter from './routes/demoRouter';

const app = express();
app.use(express.json());


app.use(demoRouter);

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

