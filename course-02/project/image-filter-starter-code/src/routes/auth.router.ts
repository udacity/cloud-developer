import { Router, Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import  config from '../config';
const router: Router = Router();

export function requireAuth (req: Request, res: Response, next: NextFunction) {

    if(!req.headers || !req.headers.authorization) {
        return res.status(401).send({message: 'No authorization header'});
    }

    const tokenBearer = req.headers.authorization.split(' ');

    if(tokenBearer.length !== 2) {
        return res.status(401).send({message: 'No authorization header'});
    }

    const token = tokenBearer[1];

    return jwt.verify(token, config.JWT_SECRET, (err: any, encoded: any) => {

        if(err) {
            return res.status(401).send({message: 'Failed to authenticate'});
        }
        return next();
    })

}