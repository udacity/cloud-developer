import { Router, Request, Response } from 'express';

import { ImageFeedRouter } from './feed/routes/imagefeed.router';


const router: Router = Router();



router.get('/', async (req: Request, res: Response) => {
    res.send("image.router");
});


export const ImageRouter: Router = router;

router.use('/feed', ImageFeedRouter);


