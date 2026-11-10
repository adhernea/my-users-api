import { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../exceptions/NotFoundError.js';
import { ErrorMessages } from '../utils/messages/ErrorMessages.js';

export const notFoundHandler = (
    req: Request,
    _res: Response,
    next: NextFunction
): void => {
    next(new NotFoundError(ErrorMessages.buildRouteNotFound(req.method, req.originalUrl)));
};