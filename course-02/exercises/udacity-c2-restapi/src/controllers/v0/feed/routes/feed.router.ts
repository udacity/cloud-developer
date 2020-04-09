import { Router, Request, Response } from 'express';
import { FeedItem } from '../models/FeedItem';
import { requireAuth } from '../../users/routes/auth.router';
import * as AWS from '../../../../aws';

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
router.get('/:id', async (req: Request, res: Response) => {
    //Dump request params in log. 
    console.log(req.params);

    //Get id query param in variable
    let id = req.params.id;

    // check ID is valid
    if (!id) {
        console.log('Id not passed');
        return res.status(400).send({ message: 'ID is required or malformed' });
    }

    //Sequalize call to search with PK
    const items = await FeedItem.findByPk(id);

    //If the item is not present send 404
    if (!items) {
        return res.status(404).send({ message: 'Requested resource not found' });
    }

    //Add the AWS related data to get S3 content
    if(items.url) {
        items.url = AWS.getGetSignedUrl(items.url);
    }
    res.send(items);
});

// update a specific resource
router.patch('/:id', 
    requireAuth, 
    async (req: Request, res: Response) => {
        console.log('Patch request');
        console.log(req.body);
        console.log(req.params);

        //Get id query param in variable
        let id = req.params.id;
        const caption = req.body.caption;
        const url = req.body.url;

        // check ID is valid
        if (!id) {
            console.log('Id not passed');
            res.status(400).send({ message: 'ID is required or malformed' });
        }

        // check Caption is valid
        if (!caption && !url) {
            console.log('No data to update. Check your request');
            res.status(400).send({ message: 'No data to update. Check your request' });
        }
        
        //Sequalize call to search with PK
        let items = await FeedItem.findByPk(id);

        //If the item is not present send 404
        if (!items) {
            console.log('Requested resource for patching not found');
            res.status(404).send({ message: 'Requested resource for patching not found' });
        }
        
        //Update caption if provided
        if (caption) {
            items.caption = caption;
        }

        //Update file if provided
        if (url) {
            items.url = url;
        }

        if (caption || url) {
            console.log('Finally making an update to the FeedItem');
            items = await items.save();
        }

        res.status(200).send(items);
});


// Get a signed url to put a new item in the bucket
router.get('/signed-url/:fileName', 
    requireAuth, 
    async (req: Request, res: Response) => {
    let { fileName } = req.params;
    const url = AWS.getPutSignedUrl(fileName);
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