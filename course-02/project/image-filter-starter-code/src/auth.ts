import { Router, Request, Response } from 'express';

import * as jwt from 'jsonwebtoken';
import { NextFunction } from 'connect';

import { config } from './config/config'

const router: Router = Router();

export function requireAuth(req: Request, res: Response, next: NextFunction) {
    if (!req.headers || !req.headers.authorization){
        return res.status(401).send({ message: 'No authorization headers.' });
    }
    
    const token_bearer = req.headers.authorization.split(' ');
    if(token_bearer.length != 2){
        return res.status(401).send({ message: 'Malformed token.' });
    }
    
    const token = token_bearer[1];

    if (!config.jwt.secret) {
        return res.status(500).send({ auth: false, message: 'Failed to load JWT secret.' });
    }

    return jwt.verify(token, config.jwt.secret, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate.' });
        }
        return next();
    });
}
