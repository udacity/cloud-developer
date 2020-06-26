import { Router, Request, Response } from 'express';
import { FeedItem } from '../models/FeedItem';
import * as AWS from '../../../../aws';

const router: Router = Router();

// Get all feed items
router.get('/', async (req: Request, res: Response) => {
    console.info('Processing feed request GET /', req.params, req.body);
    const items = await FeedItem.findAndCountAll({ order: [['id', 'DESC']] });
    items.rows.map((item) => {
        if (item.url) {
            item.url = AWS.getGetSignedUrl(item.url);
        }
    });
    res.send(items);
});

// Endpoint to GET a specific resource by Primary Key
// Get all feed items
router.get('/:id', async (req: Request, res: Response) => {
    let { id } = req.params;
    console.info('Processing feed request GET /:id', req.params, req.body);
    if (!id) {
        return res.status(400)
            .send(`id is required`);
    }

    const item = await FeedItem.findByPk(id);

    res.send(item);
});

// update a specific resource
router.patch('/:id',
    async (req: Request, res: Response) => {
        console.info('Processing feed request PATCH /:id', req.params, req.body);
        let { id } = req.params;
        console.log("PATCH FeedItem #" + id);

        if (!id) {
            return res.status(400)
                .send(`id is required`);
        }
        
        let  body  = req.body;
        console.log("body = " + JSON.stringify(body));

        const item = await FeedItem.findByPk(id);
        console.log("item found = " + item);

        const result = item.update(body, {returning: true, where: id});
        console.log("result = " + result);

        res.send(result)
    });


// Get a signed url to put a new item in the bucket
router.get('/signed-url/:fileName',
    async (req: Request, res: Response) => {
        console.info('Processing feed request GET /signed-url/:fileName', req.params, req.body);
        let { fileName } = req.params;
        const url = await AWS.getPutSignedUrl(fileName);
        console.info('Processing feed request GET /signed-url/:fileName',", signed_url:", url);
        res.status(201).send({ url: url });
    });

// Post meta data and the filename after a file is uploaded 
// NOTE the file name is they key name in the s3 bucket.
// body : {caption: string, fileName: string};
router.post('/',
    async (req: Request, res: Response) => {
        console.info('Processing feed request POST /', req.params, req.body);
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