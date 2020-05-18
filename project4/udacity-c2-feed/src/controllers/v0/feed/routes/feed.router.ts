import { Router, Request, Response } from 'express';
import { FeedItem } from '../models/FeedItem';
import * as AWS from '../../../../aws';
import * as jwt from 'jsonwebtoken'
import { NextFunction } from 'connect'

const router: Router = Router();

export function requireAuth(req: Request, res: Response, next: NextFunction) {
    if ( !req.headers || !req.headers.authorization ) {
        return res.status(401).send( { message: 'No authorization headers.' })
    }

    const tokenBearer = req.headers.authorization.split(' ')
    if ( tokenBearer.length != 2 ) {
        return res.status(401).send( { message: 'Malformed token.' })
    }

    const token = tokenBearer[1]
    return jwt.verify(token, "hello", (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate.' })
        }
        return next()
    })
}
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
router.get("/:id",
    requireAuth,
    async (req: Request, res: Response) => {
        let { id } = req.params

        if ( !id ) {
            res.status(400).send(`resource id is required`)
        }

        const feed = await FeedItem.findByPk(id)

        if ( !feed ) {
            res.status(404).send(`Feed with ${id} not found in the DB`)
        } else {
            res.status(200).send(feed)
        }
})
// update a specific resource
router.patch('/:id', 
    requireAuth,
    async (req: Request, res: Response) => {
        //@TODO try it yourself
        //res.status(500).send("not implemented")

        const { id } = req.params
        //const caption = req.body.caption
        const caption = req.body.caption
        const fileName = req.body.url

        if ( !id ) {
            res.status(400).send({message: 'resource id is required'})
        }
        if ( !caption ) {
            res.status(400).send({message: 'caption is required or malformed'})
        }

        if ( !fileName ) {
            res.status(400).send({message: 'file url is require'})
        }
       
        const feed = await FeedItem.findByPk(id)

        if ( !feed ) {
            res.status(404).send(`Couldn't find feed with ${id}`)
        }

        const [updateRows, updatedFeed] = await FeedItem.update( 
            { caption: caption, url: fileName},
            { returning: true, where: {id: id}}
        )

        const saved_url = AWS.getGetSignedUrl(updatedFeed[0].url)

        res.status(201).send("Successfully updated, " + saved_url)

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