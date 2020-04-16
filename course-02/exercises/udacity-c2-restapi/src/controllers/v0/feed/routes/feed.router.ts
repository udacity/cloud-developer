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

router.route('/:id')
    // GET a specific resource by Primary Key
    .get(
        requireAuth,
        async (req: Request, res: Response) => {
            const { id } = req.params
            console.log(req.params)
            const items = await FeedItem.findByPk(id)
            if (items) {
                res.status(200).send(items)
            } else {
                res.status(404).send('Item not found')
            }
        })
    // update a specific resource
    .patch(
        requireAuth,
        async (req: Request, res: Response) => {
            const { id } = req.params
            const item = await FeedItem.findByPk(id)
            if (!item) {
                res.status(404).send('Item not found')
                return
            }

            const caption = req.body.caption;
            const fileName = req.body.url;

            // check Caption is valid
            if (caption) {
                item.caption = caption
            }
            if (fileName) {
                item.url = fileName
            }
            await item.save()
            res.status(202).send(item);
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
// NOTE the file name is the key name in the s3 bucket.
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