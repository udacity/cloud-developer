import { Router, Request, Response } from 'express';

import { User } from '../models/User';
import { AuthRouter, requireAuth } from './auth.router';

const router: Router = Router();

router.use('/auth', AuthRouter);

router.get('/', async (req: Request, res: Response) => {
});

router.get('/:id', async (req: Request, res: Response) => {
    let { id } = req.params;
    const item = await User.findByPk(id);
    res.send(item);
});

router.post('/addUser', async(req:Request, res:Response) =>{

    const email = req.params.email;
    const password = req.params.password_hash;

    if (email == null)
    {
        res.status(400).send({auth : false, message : "Email address cannot be null"});
    }

    const userByPK = await User.findByPk(email);
    if (userByPK != null)
    {
        res.status(400).send({auth : false, message : "A user with same email address already present"});
    }

    

})
export const UserRouter: Router = router;