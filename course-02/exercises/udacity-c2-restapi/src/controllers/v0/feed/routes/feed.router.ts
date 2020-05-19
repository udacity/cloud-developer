import { Router, Request, Response } from 'express';
import { FeedItem } from '../models/FeedItem';
import { requireAuth } from '../../users/routes/auth.router';
import * as AWS from '../../../../aws';
import {NOT_FOUND,BAD_REQUEST, INTERNAL_SERVER_ERROR, OK, NO_CONTENT} from 'http-status-codes'
const router: Router = Router();

// Get all feed items
router.get('/', async (req: Request, res: Response) => {
    const items = await FeedItem.findAndCountAll({order: [['id', 'DESC']]});
    items.rows.map((item) => {
            if(item.url) {
                item.url = AWS.getGetSignedUrl(item.url);
            }
    });
    res.send(items);
});


//Add an endpoint to GET a specific resource by Primary Key

// update a specific resource
router.patch('/:id', 
    requireAuth, 
    async (req: Request, res: Response) => {
        console.log(req.params)
        let {id} = req.params

        if(!id) {
            return res.status(BAD_REQUEST).send("Id need to be specified")
        }

        const theFeed = await FeedItem.findAll({where: {id: id}})

        if(!theFeed || theFeed.length == 0) {
            return res.status(NOT_FOUND).send(`${id} not found`)
        }

        if(theFeed.length != 1) {
            return res.status(INTERNAL_SERVER_ERROR).send('Encountered an unexpected error')
        }

        const fi = theFeed[0]
        
        let { caption, url} = req.body;

        if(caption || url) {
            if(caption) {
                fi.caption = caption
            }

            if(url) {
                fi.url = url
            }

            await fi.save()
        }

        res.status(NO_CONTENT).send(theFeed[0])
});


// Get a signed url to put a new item in the bucket
router.get('/signed-url/:fileName', 
    requireAuth, 
    async (req: Request, res: Response) => {
    
    let { fileName } = req.params;
    console.log("Getting signed url for: " + fileName)
    const url = AWS.getPutSignedUrl(fileName);
    console.log(`Signed URL is ${url}`)
    res.status(201).send({url: url});
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