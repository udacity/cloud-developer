import { Router, Request, Response } from 'express';
import { FeedRouter } from './feed/routes/feed.router';
import { UserRouter } from './users/routes/user.router';
import got from 'got';
import { logger } from '../../utils/logger';

const router: Router = Router();

router.use('/feed', FeedRouter);
router.use('/users', UserRouter);

router.get('/', async (req: Request, res: Response) => {    
    res.send(`V0`);
});

router.get('/filteredImage', async (req: Request, res: Response) => {
    const { image_url } = req.query;
    if (!image_url) {
        return res.status(400).send({ message: 'A valid image url must be sent' });
    }

    try {
        const target = `http://localhost:8082/filteredimage?image_url=${image_url}`
        const filteredImage = await got(target);
        res.send(filteredImage);
    } catch (e) {
        logger.error(String(e));
        res.status(500).send({ message: 'There was an error processing the image' });
    }
});

export const IndexRouter: Router = router;