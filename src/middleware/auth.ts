import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

const auth = (...requiredRoles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;

            if (!token) {
                throw new Error('No token provided');
            }

            const decoded = jwt.verify(token, config.jwt_secret as string) as JwtPayload;

            if (requiredRoles.length > 0 && !requiredRoles.includes(decoded.role)) {
                throw new Error('Unauthorized');
            }
            req.user = decoded as JwtPayload;
            next();
        } catch (err) {
            next(err);
        }
    }
}
export default auth;