import  express  from 'express';

const router = express.Router();

router.get('/ping', (_req, res) => {
    res.send('pong');
});

  type MultiplyPayload = {value1: number, value2: number};

router.post('/multiply', (req, res) => {
    console.log('body:',req.body);
    const payload = req.body as MultiplyPayload;
    res.send({ result: payload.value1 * payload.value2 });
});

export default router;