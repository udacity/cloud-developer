import { Request, Response, NextFunction} from 'express';

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const authorization: string|undefined = req.header('authorization');
    if(!authorization){
        res.status(401).send({
            status: 'failed',
            message: 'Access token required !'
        });
    }
    const token = authorization.split('Bearer ')[1];
    if(!token || token !== process.env.API_TOKEN ){
        res.status(401).send({
            status: 'failed',
            message: 'Invalid access token supplied'
        });
    }

    next();
}