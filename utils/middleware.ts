import * as express from 'express';

const unknownEndpoint = (request: express.Request, response: express.Response) => {
    console.error('Unknown endpoint ',request.originalUrl);
    response.status(404).send({ error: 'unknown endpoint' });
};

module.exports = { unknownEndpoint };