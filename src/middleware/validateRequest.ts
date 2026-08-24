import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

const validateRequest = (schema: ZodSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                cookies: req.cookies,
            });
            return next();
        } catch (err) {
            next(err);
        }
    };
}

export default validateRequest;