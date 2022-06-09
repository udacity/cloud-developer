import { Router, Request, Response } from 'express';
import { FeedItem } from '../models/FeedItem';
import { requireAuth } from '../../users/routes/auth.router';
import * as AWS from '../../../../aws';

const router: Router = Router();

// Get all feed items
router.get('/', async (req: Request, res: Response) => {
    const items = await FeedItem.findAndCountAll({ order: [['id', 'DESC']] });
    items.rows.map((item) => {
        if (item.url) {
            item.url = AWS.getGetSignedUrl(item.url);
        }
    });
    res.send(items);
});

//@TODO
//Add an endpoint to GET a specific resource by Primary Key
router.get('/:id', async (req: Request, res: Response) => {
    // validate parameter
    const { id } = req.params;

    if (!id || isNaN(+id)) {
        return res.status(400).send({ message: 'Feed Id is required and should be a valid number!' });
    }

    try {
        // find feed with primary-key as id
        const feed = await FeedItem.findByPk(+id);
        feed.url = AWS.getGetSignedUrl(feed.url);

        res.status(200).send(feed);
    } catch (error) {
        res.status(400).send({ message: error.toString() });
    }
});

// update a specific resource
router.patch('/:id',
    requireAuth,
    async (req: Request, res: Response) => {
        // validate parameter
        const { id } = req.params;
        const { caption, fileName } = req.body;

        if (!id || isNaN(+id)) {
            return res.status(400).send({ message: 'Feed Id is required and should be a valid number!' });
        }

        try {
            // get feed with id
            let feed = await FeedItem.findByPk(+id);

            if (feed) {
                feed.caption = caption ?? feed.caption;
                feed.url = fileName ?? feed.url;
            }

            // save updated feed
            const updatedFeed = await feed.save();

            updatedFeed.url = AWS.getGetSignedUrl(updatedFeed.url);
            res.status(200).send(updatedFeed);
        } catch (error) {
            res.status(400).send({ message: error.toString() });
        }
    });


// Get a signed url to put a new item in the bucket
router.get('/signed-url/:fileName',
    requireAuth,
    async (req: Request, res: Response) => {
        let { fileName } = req.params;
        const url = AWS.getPutSignedUrl(fileName);
        res.status(201).send({ url: url });
    });

// Post meta data and the filename after a file is uploaded 
// NOTE the file name is they key name in the s3 bucket.
// body : {caption: string, fileName: string};
router.post('/',
    requireAuth,
    async (req: Request, res: Response) => {
        const caption = req.body.caption;
        const fileName = req.body.url;

        // check Caption is valid
        if (!caption) {
            return res.status(400).send({ message: 'Caption is required or malformed' });
        }

        // check Filename is valid
        if (!fileName) {
            return res.status(400).send({ message: 'File url is required' });
        }

        const item = await new FeedItem({
            caption: caption,
            url: fileName
        });

        const saved_item = await item.save();

        saved_item.url = AWS.getGetSignedUrl(saved_item.url);
        res.status(201).send(saved_item);
    });

export const FeedRouter: Router = router;