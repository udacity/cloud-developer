import { Router, Request, Response } from 'express';
import { FeedItem } from '../models/FeedItem';
import { requireAuth } from '../../users/routes/auth.router';
import * as AWS from '../../../../aws';
import {config} from '../../../../config/config';

const router: Router = Router();


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

// Update a specific resource
// This was given as an exercise
router.patch('/:id', requireAuth, async (req: Request, res: Response) => {
    // Required id parameter
    const { id } = req.params;
    // Verify parameters
    if ( !id ) {
        return res.status(400).send(`id is required.`);
    }
    // Required JSON body
    const caption = req.body.caption;
    const fileName = req.body.url;
    // Verify caption
    if (!caption) {
        return res.status(400).send({ message: 'Caption is required or malformed' });
    }
    // Verify fileName
    if (!fileName) {
        return res.status(400).send({ message: 'File url is required' });
    }
    // Find item based on the search parameter
    const item: FeedItem = await FeedItem.findByPk(id);
    // Update the caption and url
    const updated_item = await item.update({
        'caption': caption,
        'url': fileName
    });
    updated_item.url = AWS.getGetSignedUrl(updated_item.url);
    res.status(200).send(updated_item);
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

/***********************************************************************************************/
// @TODO Refactor the project to make a request to the image filtering service upon image upload


const axios = require('axios');
const fs = require('fs');
const fileUrl = require('file-url');

// Save an image and return its URL in local host
async function saveData (data: any) {
    // Create a random file
    const fileName = '/src/tmp/filtered.' + Math.floor(Math.random() * 2000) + '.jpg';
    // Save the file
    fs.writeFile(fileName, data, 'binary', function(err: any) {
        if (err) {
            throw err;
        }
        return fileUrl(fileName);
    });
}
// Interact with Image_Filter_Server
async function filterImage (img_url: string) {
    // Add the url to the API call
    const url = `${config.filter.host}${img_url}`;
    // Send a GET request with a header that expects an image
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

// Prototype used to Test Image_Filter_Server
router.get( '/filter/', async (req: Request, res: Response) => {
    const fileName = req.body.url;
    // check Filename is valid
    if (!fileName) {
        return res.status(400).send(`File url is required`);
    }
    await filterImage(fileName)
        .then( async (data: string) => {
            res.send(data);
        });
});

/***********************************************************************************************/

export const FeedRouter: Router = router;
