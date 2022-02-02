import  express  from 'express';
import { MultiplyPayloadDemo } from '../types';
import * as demoService from '../services/demoService';

const router = express.Router();

router.get('/ping', (_req, res) => {
    res.send('pong');
});

router.post('/multiply', (req, res) => {
    const payload = req.body as MultiplyPayloadDemo;
    const result = demoService.multiply(payload);
    res.status(200).send({ result: result });
});

export default router;