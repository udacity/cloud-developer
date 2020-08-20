import { Router, Request, Response } from 'express';
import { NextFunction } from 'connect';
import { config } from '../../../../config/config';

const router: Router = Router();

export function requireAuth(req: Request, res: Response, next: NextFunction) {
    // return next();
    if (!req.headers || !req.headers.authorization){
        return res.status(401).send({ message: 'No authorization headers.' });
    }
    
    if (req.headers.authorization !== config.authorization.secret){
        return res.status(401).send({ auth: false, message: 'Unauthorized.' });
    }

    return next();
}

export const AuthRouter: Router = router;