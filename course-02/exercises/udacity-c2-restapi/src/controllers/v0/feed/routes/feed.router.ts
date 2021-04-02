import { Router, Request, Response } from 'express';
import { FeedItem } from '../models/FeedItem';
import { requireAuth } from '../../users/routes/auth.router';
import * as AWS from '../../../../aws';
import { v4 as uuidv4 } from 'uuid';
import { downloadFilteredImage } from '../../../../api/imagefilter';
import { deleteLocalFile, extractToken } from '../../../../util/util'

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

// Get specific item by primary key
router.get('/:id', async (req: Request, res: Response) => {
    let { id } = req.params;
    const item = await FeedItem.findByPk(id);
    item.url = AWS.getGetSignedUrl(item.url);
    res.send(item);
});

// update a specific resource
router.patch('/:id', 
    requireAuth, 
    async (req: Request, res: Response) => {
        //@TODO try it yourself
        res.send(500).send("not implemented")
});


// Get a signed url to put a new item in the bucket
router.get('/signed-url/:fileName', 
    requireAuth, 
    async (req: Request, res: Response) => {
    let { fileName } = req.params;
    fileName = uuidv4() + "_" + fileName;
    const url = AWS.getPutSignedUrl(fileName);
    res.status(201).send({url: url, file_name: fileName});
});

// Post meta data and the filename after a file is uploaded 
// NOTE the file name is they key name in the s3 bucket.
// body : {caption: string, fileName: string};
router.post('/', 
    requireAuth, 
    async (req: Request, res: Response) => {
    const caption = req.body.caption;
    const filter = req.body.filter;
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

    const signed_url = AWS.getGetSignedUrl(fileName);
    const saved_item = await item.save();
    saved_item.url = signed_url

    if (filter) {
        const token = extractToken(req)
        const localPath = "/tmp/" + fileName
        downloadFilteredImage(token, signed_url, localPath)
        .then(() =>{
            AWS.uploadFile(localPath, fileName).then(() => {
                deleteLocalFile(localPath)
                res.status(201).send(saved_item);
            }, (err) => {
                console.log(err);
                res.status(500).send("cannot save filtered image");
            })
        }, (r) => {
            console.error(r)
            res.status(500).send("failed to filter image");
        })
    } else {
        res.status(201).send(saved_item);
    }
});

export const FeedRouter: Router = router;