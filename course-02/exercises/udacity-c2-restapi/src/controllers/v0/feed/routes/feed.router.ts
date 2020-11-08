import { Router, Request, Response } from 'express';
import { FeedItem } from '../models/FeedItem';
import { requireAuth } from '../../users/routes/auth.router';
import * as AWS from '../../../../aws';
import request from 'superagent';
import { config } from '../../../../config/config';
import { EventEmitter } from 'events'

const c = config.image_filter;
const router: Router = Router();

// Get all feed items
router.get('/', 
    requireAuth,
    async (req: Request, res: Response) => {
    const items = await FeedItem.findAndCountAll({ order: [['id', 'DESC']] });
    items.rows.map((item) => {
        if (item.url) {
            item.url = AWS.getGetSignedUrl(item.url);
        }
    });
    res.send(items);
});

// GET a specific resource by Primary Key
router.get('/:id', 
    requireAuth,
    async (req: Request, res: Response) => {
    let { id } = req.params;
    const item = await FeedItem.findByPk(id);
    res.send(item);
});

// update a specific resource
router.patch('/:id',
    requireAuth,
    async (req: Request, res: Response) => {
        let { id } = req.params;
        const item = await FeedItem.findByPk(id);

        const caption = req.body.caption;
        const fileName = req.body.url;

        if (caption) {
            item.set('caption', caption);
        };
        if (fileName) {
            item.set('url', fileName);
        };

        const saved_item = await item.save();
        res.status(200).send(saved_item);
    });


// Get a signed url to put a new item in the bucket
router.get('/signed-url/:fileName',
    requireAuth,
    async (req: Request, res: Response) => {
        let { fileName } = req.params;
        const url = AWS.getPutSignedUrl(fileName);
        res.status(201).send({ url: url });
    });

// Put an image from a public URL to filestore 
// using a signed URL after image is filtered
// body : {public_url: string, filename: string};
router.put('/',
    requireAuth,
    async (req: Request, res: Response) => {

        // read in parameters from the request body
        const public_url = req.body.public_url;
        const filename = req.body.filename as string;

        // check URL is present
        if (!public_url) {
            return res.status(400).send({ message: 'File url is required' });
        }

        // check filename is present
        if (!filename) {
            return res.status(400).send({ message: 'Filename is required' });
        }

        // use and event to act on returned image
        var data = new EventEmitter();
        var putimage = new EventEmitter();

        (async () => {
            try {
              // make http get call to return the filtered immage
              // from the public URL
              const resp = await request
                .get(c.endpoint + '/filteredimage')
                .query({ image_url: public_url });
              // send image from response body to waiting event
              data.emit('done', resp.body);
            } catch (err) {
                return res.status(400).send({ message: 'filtered image get failed', err: err });
            }
          })();

          // act on received filtered imaqge
          data.on('done', (image) => {
            (async () => {
                try {
                    // get a signed URL based on input filename
                    // and put filtered image to the AWS file store
                    const resp = await request
                            .put(AWS.getPutSignedUrl(filename))
                            .send(image)
                            .set('Content-type', 'image/jpeg')
                    putimage.emit('done', resp);
                } catch (err) {
                    return res.status(400).send({ message: 'signed URL put failed', err: err });
                }
            })();
        });
        
        putimage.on('done', (putres) => {
            return res.status(200)
                .send({ message: 'filtered image uploaded to the file store' });//,
                      //  put_response: putres });
        });
    });

// Post meta data and the filename after a file is uploaded 
// NOTE the file name is they key name in the s3 bucket.
// body : {caption: string, url: string};
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