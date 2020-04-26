import {Router, Request, Response} from 'express';
import {FeedItem} from '../models/FeedItem';
import {requireAuth} from '../../users/routes/auth.router';
import * as AWS from '../../../../aws';

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

// Get a signed url to put a new item in the bucket
router.get('/signed-url/:fileName',
    requireAuth,
    async (req: Request, res: Response) => {
        const {fileName} = req.params;

        if (!fileName) {
            return res.status(500).send({message: `fileName must not be empty`});
        }

        const url = AWS.getPutSignedUrl(fileName);
        res.status(201).send({url: url});
    });

// endpoint to GET a specific resource by Primary Key
router.get('/:id', async (req: Request, res: Response) => {
    const {id} = req.params;

    try {
        const item = await FeedItem.findByPk(id);
        if (item) {
            return res.status(200).send(item);
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error);
    }
});

// update a specific resource
router.patch('/:id',
    requireAuth,
    async (req: Request, res: Response) => {
        const id = req.params.id;
        if (!id) {
            return res.status(500).send({message: `No id given`});
        }

        try {
            const validatedBody = validateBody(req.body);
            const updatedItems = await FeedItem.update(validatedBody, {
                where: {id},
                returning: true
            });
            if (updatedItems[0] === 0) {
                return res.status(500).send({message: `No matching item for id ${id} found`});
            } else if (updatedItems[0] > 1) {
                return res.status(500).send({message: `more than one item for id ${id} found`});
            }

            const saved_item = updatedItems[1][0];
            saved_item.url = AWS.getGetSignedUrl(saved_item.url);
            res.status(201).send(saved_item);
        } catch (e) {
            const error: Error = e;
            res.status(500).send({message: error.message});
        }
    });


// Post meta data and the filename after a file is uploaded
// NOTE the file name is they key name in the s3 bucket.
// body : {caption: string, fileName: string};
router.post('/',
    requireAuth,
    async (req: Request, res: Response) => {
        try {
            const validatedBody = validateBody(req.body);
            const item = new FeedItem(validatedBody);
            const saved_item = await item.save();

            saved_item.url = AWS.getGetSignedUrl(saved_item.url);
            res.status(201).send(saved_item);
        } catch (e) {
            const error: Error = e;
            res.status(500).send({message: error.message});
        }
    }
);

function validateBody(input: any): object | never {
    // check Caption is valid
    if (!input.caption) {
        throw Error('Caption is required or malformed');
    }

    // check Filename is valid
    if (!input.url) {
        throw Error('File url is required');
    }

    return {
        caption: input.caption,
        url: input.url
    };
}

export const FeedRouter: Router = router;
