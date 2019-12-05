import { Router, Request, Response } from 'express';
import { ImageRouter } from './images/routes/image.router';

const router: Router = Router();

router.use('/images', ImageRouter);

router.get('/', async (req: Request, res: Response) => {    
    res.send(`V0`);
});

export const IndexRouter: Router = router;