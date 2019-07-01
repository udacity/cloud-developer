import { Router, Request, Response } from 'express';
import { FeedItem } from '../models/FeedItem';
import { requireAuth } from '../../users/routes/auth.router';
import * as AWS from '../../../../aws';
import {config} from '../../../../config/config';

const router: Router = Router();
const axios = require('axios');

async function filterImage (img_url: string) {
    const url = `${config.filter.host}` + img_url;
    return axios.request({
        responseType: 'arraybuffer',
        url: url,
        method: 'get',
        headers: {
            'Content-Type': 'image/jpeg',
        },
    }).then((result: { data: any; }) => {
        return result.data;
    });
}
// Filter Image
router.get( '/filter?image_url', async (req: Request, res: Response) => {
    const { image_url } = req.query;
    if ( !image_url ) {
        return res.status(400).send('url required');
    }
    await filterImage(image_url)
        .then( (data) => {
            res.write(data);
            res.end();
    });
});

// Get all feed items
router.get('/', async (req: Request, res: Response) => {
    const items = await FeedItem.findAndCountAll({order: [['id', 'DESC']]});
    items.rows.map((item) => {
            if (item.url) {
                item.url = AWS.getGetSignedUrl(item.url);
            }
    });
    res.send(items);
});

// Get a specific resource
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const item = await FeedItem.findByPk(id);
    if (!item ) {
        return res.status(400).send('id not found');
    }
    res.send(item);
});

// update a specific resource
router.patch('/:id', requireAuth, async (req: Request, res: Response) => {
    // Required id parameter
    const { id } = req.params;
    // Check if id is valid
    if ( !id ) {
        return res.status(400).send(`id is required.`);
    }
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
    // Find item
    const item = await FeedItem.findByPk(id);
    // Update item
    item.caption = caption;
    item.url = AWS.getPutSignedUrl(fileName);
    item.updatedAt = new Date();
    // Return item
    res.send(item);
});


// Get a signed url to put a new item in the bucket
router.get('/signed-url/:fileName', requireAuth, async (req: Request, res: Response) => {
    const { fileName } = req.params;
    const url = AWS.getPutSignedUrl(fileName);
    res.status(201).send({url: url});
});

// Post meta data and the filename after a file is uploaded
// NOTE the file name is they key name in the s3 bucket.
// body : {caption: string, fileName: string};
router.post('/', requireAuth, async (req: Request, res: Response) => {
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
