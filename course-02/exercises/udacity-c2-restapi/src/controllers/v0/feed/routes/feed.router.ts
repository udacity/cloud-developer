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

//@TODO
//Add an endpoint to GET a specific resource by Primary Key
/* router.get('/:id', async (req: Request, res: Response) => {
    let reqid = req.query.id;
    if ( !reqid ) {
        return res.status(400).send("id is required");
    }

    // does the work but this is a bit shitty... does it not obtain all possible records first and then filters it locally? is there no way to filter
    // it directly by id?
    const items = await FeedItem.findAndCountAll({order: [['id', 'DESC']]});
    const filtered = items.rows.filter((target) => target.id == reqid);

    filtered.map((item) => {
        if(item.url) {
            item.url = AWS.getGetSignedUrl(item.url)
        }
    })

    if (filtered && filtered.length === 0) {
        return res.status(404).send("id not found");
    }
    
    res.status(200).send(filtered);
    
    
}) */


router.get('/:id', async (req: Request, res: Response) => {
    let { id } = req.params;
    if (!id) {
        return res.status(400).send("id is required")
    }

    const items = await FeedItem.findByPk(id);

    // console.log(items);
    if(items){
        res.send(items)
    }
    else {
        res.status(404).send("id does not exist")
    }
    
});

// update a specific resource
router.patch('/:id', 
    requireAuth, 
    async (req: Request, res: Response) => {
        //@TODO try it yourself
        // res.status(500).send("not implemented")
        const caption = req.body.caption;
        const fileName = req.body.url;

        if (!caption) {
            return res.status(400).send({message: 'Caption is required or malformed'});
        }

        if (!fileName) {
            return res.status(400).send({message: 'File url is required'});
        }

        let {id} = req.params;
        const item = await FeedItem.findByPk(id);
        item.url = fileName;
        item.caption = caption;
        
        const savedItem = await item.save();
        savedItem.url = AWS.getGetSignedUrl(savedItem.url);
        res.status(201).send(savedItem);

        //Alternative solution:

        /* const item = await FeedItem.update(
            { caption: caption },
            { where: { id: 1 } }
        );

        const saved_item = item[1]; */


        
});


// Get a signed url to put a new item in the bucket
router.get('/signed-url/:fileName', 
    requireAuth, 
    async (req: Request, res: Response) => {
    let { fileName } = req.params;
    const url = AWS.getPutSignedUrl(fileName);
    res.status(201).send({url: url});
});

// Retrieves signed URL for upload to S3; note that when copying the url the quotation marks have to be removed in Postman!!

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