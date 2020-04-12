import { Router, Request, Response } from 'express';
import { User }                      from '../models/User';
import { AuthRouter, requireAuth }   from './auth.router';


const router: Router = Router();

router.use('/auth', AuthRouter);

router.get('/', async (req: Request, res: Response) => {
  const items = await User.findAndCountAll();
  res.status(200).send(items);
});


router.get('/:email', async (req: Request, res: Response) => {
    const { email } = req.params;
    const item = await User.findByPk(email);
    if (item) {
      res.status(200).send(item);
    } else {
      res.status(404).send(`There is no user with email: ${email}!`);
    }
});

export const UserRouter: Router = router;
