import { Router, Request, Response } from 'express';
import { FeedItem } from '../models/FeedItem';
import * as AWS from '../../../../aws';
import { integer } from 'aws-sdk/clients/cloudfront';

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
router.get('/:id', async (req: Request, res: Response) => {
    let  id  = Number(req.params.id);
    if(!id){
        res.status(400).send("Id bad formatted");
    }
    const item = await FeedItem.findByPk(id);
    if(!item){
        res.status(404).send("Item not found");
    }

    res.status(200).send(item);
});

// update a specific resource
router.patch('/:id',  
    async (req: Request, res: Response) => {
        let  id  = Number(req.params.id);
        //@TODO try it yourself
        if(!id){
            res.status(400).send("bad item");
        }
        FeedItem.update(req.body,{returning: true,where: {id:id}}).then(function([ rowsUpdate, [udatedFeed] ]) {
            if(!udatedFeed){
                res.status(404).send('No record found');
            }
            res.status(200).send(udatedFeed);
          }).catch(function(error) {
            res.status(500).send(error);
          }) 
});


// Get a signed url to put a new item in the bucket
router.get('/signed-url/:fileName', 
     
    async (req: Request, res: Response) => {
    let { fileName } = req.params;
    const url = AWS.getPutSignedUrl(fileName);
    res.status(201).send({url: url});
});

// Post meta data and the filename after a file is uploaded 
// NOTE the file name is they key name in the s3 bucket.
// body : {caption: string, fileName: string};
router.post('/',  
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