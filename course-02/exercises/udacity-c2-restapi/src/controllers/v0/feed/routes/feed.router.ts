import { Router, Request, Response } from 'express';
import { FeedItem }                  from '../models/FeedItem';
import { requireAuth }               from '../../users/routes/auth.router';
import * as AWS                      from '../../../../aws';


const router: Router = Router();

/**
 *  Get a signed url to put a new item in the bucket
 *  The root directory router.get('/',... is not the server root directory.
 *  The root in this case is based on where the server is entering from,
 *  which in this case, is api/v0/feed/routes.
 */
router.get('/', async (req: Request, res: Response) => {
  const items = await FeedItem.findAndCountAll({order: [['id', 'DESC']]});
  items.rows.map((item) => {
    if (item.url) item.url = AWS.getGetSignedUrl(item.url);
  });
  res.send(items);
});


// GET a specific resource by using its id
router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const item = await FeedItem.findByPk(id);
    if (item) {
      res.status(200).send(item);
    } else {
      res.status(404).send('The item with the given id does not exist!')
    }
});

// PATCH (update) a specific resource
router.patch('/:id', requireAuth,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateParams = req.body;
    const validUpdateFields = ['caption', 'url'];
    const isValid = Object.keys(updateParams).every(param => {
      return validUpdateFields.includes(param.toLowerCase());
    });
    const forbidden = `Only these fields: { ${validUpdateFields.join(', ')} } can be updated!`;
    if (!isValid) return res.status(403).send(forbidden);

    const updatedEntriesNumber = await FeedItem.update(updateParams, { where: { 'id': id } })
    if (updatedEntriesNumber[0]) {
      return res.status(200).send('The item has been updated successfully');
    } else {
      return res.status(404).send(`No item has been found with id: ${id}!`);
    }
});

// Get a signed url to put a new item in the bucket
router.get('/signed-url/:fileName', requireAuth,
  async (req: Request, res: Response) => {
    let { fileName } = req.params;
    const url = AWS.getPutSignedUrl(fileName);
    res.status(201).send({ url: url });
});

// Post meta data and the filename after a file is uploaded
// NOTE the file name is they key name in the s3 bucket.
// body : {caption: string, fileName: string};
router.post('/', requireAuth,
  async (req: Request, res: Response) => {
    const caption = req.body.caption;
    const fileName = req.body.url;

    // check Caption is valid
    if (!caption) return res.status(400).send({ message: 'Caption is required or malformed' });

    // check Filename is valid
    if (!fileName) return res.status(400).send({ message: 'File url is required' });

    const item = await new FeedItem({
      caption: caption,
      url: fileName
    });

    const saved_item = await item.save();

    saved_item.url = AWS.getGetSignedUrl(saved_item.url);
    res.status(201).send(saved_item);
  }
);

export const FeedRouter: Router = router;
