import { Router, Request, Response } from 'express';

import { User } from '../models/User';
import { AuthRouter, requireAuth } from './auth.router';

const router: Router = Router();

router.use('/auth', AuthRouter);

router.get('/', async (req: Request, res: Response) => {
    res.send('users');
});

router.get('/:id',
    requireAuth,
    async (req: Request, res: Response) => {
        let { id } = req.params;
        const item = await User.findByPk(id);
        res.send(item);
    });

export const UserRouter: Router = router;