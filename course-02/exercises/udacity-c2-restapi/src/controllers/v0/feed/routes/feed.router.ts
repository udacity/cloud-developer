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
// Get all feed items
router.get('/:id', async (req: Request, res: Response) => {
    let { id } = req.params;

    if ( !id ) {
        return res.status(400)
                .send(`id is required`);
    }

    const item = await FeedItem.findByPk(id);

    if(!item){
        return res.status(404).send(`it is not found`);
    }
    
    if(item.url) {
        item.url = AWS.getGetSignedUrl(item.url);
    }
    res.send(item);
});

// update a specific resource
router.patch('/:id', 
    requireAuth, 
    async (req: Request, res: Response) => {
        //@TODO try it yourself

        let { id } = req.params;

        if ( !id ) {
            return res.status(400)
                    .send(`id is required`);
        }

        const caption = req.body.caption;
        const fileName = req.body.url;

        // check Caption or Filename is valid
        if (!caption && !fileName) {
            return res.status(400).send({ message: 'Caption or fileName is required or malformed' });
        }

        // check id is valid
        if (!id) {
            return res.status(400).send({ message: 'Id is required' });
        }

        let param = {};
        if(caption && fileName) {
            param = { caption: caption,url: fileName }
        }else if(caption) {
            param = { caption: caption}
        }else if(fileName){
            param = { url: fileName }
        }

        
        const items = await FeedItem.update(param, {
            returning: true,
            where: {
                    id: id
                }
            })
            .then(function([ rowsUpdate, [updatedFeedItem] ]) {
                if(!updatedFeedItem) 
                {
                    res.status(400).send("There is nothing to update!")
                }
                else {
                if(updatedFeedItem.url) {
                    updatedFeedItem.url = AWS.getGetSignedUrl(updatedFeedItem.url);
                }
                res.status(200).json(updatedFeedItem)
            }
            });

        // res.send(500).send("not implemented")
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