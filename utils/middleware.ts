import { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';

morgan.token('body', function (req: Request, _res) { return JSON.stringify(req.body); });
export const requestLogger = morgan(':method :url :status :res[content-length] - :response-time ms :body');

export const unknownEndpoint = (request: Request, response: Response) => {
    console.error('Unknown endpoint ',request.originalUrl);
    response.status(404).send({ error: 'unknown endpoint' });
};

export const errorHandler = (error: Error, _request: Request, response: Response, next: NextFunction) => {
    console.error(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    } else {
        return response.status(400).send({ error: error });
    }

    next(error);
};
