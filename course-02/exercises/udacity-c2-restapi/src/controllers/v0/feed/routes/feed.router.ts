import { Router, Request, Response } from 'express';
import { FeedItem } from '../models/FeedItem';
import { requireAuth } from '../../users/routes/auth.router';
import * as AWS from '../../../../aws';
import axios  from 'axios';
import { request } from 'https';
import { config } from '../../../../config/config';
import fs from 'fs';
import { Base64 } from 'js-base64';
import FormData  from 'form-data';



const c = config.dev;

const router: Router = Router();

const imageFilterPrefix = 'processed-';

// Get all feed items
router.get('/', async (req: Request, res: Response) => {
    const items = await FeedItem.findAndCountAll({order: [['id', 'DESC']]});
    items.rows.map((item) => {
            if(item.url) {
                item.url = AWS.getGetSignedUrl(item.url);
            }
            if(item.processedUrl) {
                item.processedUrl = AWS.getGetSignedUrl(item.processedUrl);
            }
    });
    res.send(items);
});

router.get('/:id', async (req: Request, res: Response) => {
      const { id } = req.params;

        // check Id is valid
        if (!id) {
            return res.status(400).send({ message: 'id is required' });
        }

    const item = await FeedItem.findByPk(id);
    res.send(item);
});

// update a specific resource
router.patch('/:id', 
    requireAuth, 
    async (req: Request, res: Response) => {
    const caption = req.body.caption;
    const fileName = req.body.url;
    const { id } = req.params;

    if ( !id || !caption || !fileName ) {
        return res.status(400).send({ message: 'id , caption, filename is required' });
    }

    const [numberOfAffectedRows, affectedRows] = await FeedItem.update({ 
        caption: caption,
        url: fileName
      }, {
        where: {id: id},
        returning: true
      })

      if(numberOfAffectedRows > 0)      
        res.status(200).send(affectedRows);
    
    res.status(404).send({ message: 'feed with id is not found!' });
});


// Get a signed url to put a new item in the bucket
router.get('/signed-url/:fileName', 
    requireAuth, 
    async (req: Request, res: Response) => {
    let { fileName } = req.params;
    const url = AWS.getPutSignedUrl(fileName);
    res.status(201).send({url: url});
});

//functions for communicating with image-filter and send to aws S3
async function callImageFilterAndUploadToAws(req: Request,url: string,key: string) : Promise<boolean> {
    return new Promise(function(resolve, reject) {
        const token_bearer = req.headers.authorization.split(' ');
        const token = token_bearer[1].split(',')[0];
     axios({
        headers: {
            Authorization: "Bearer " + token
         },
        method: 'get',
        url: c.image_filter_url + Base64.encode(url) + '&encoded=true',
        responseType: 'stream'
      })
    .then(function (response) {
        const s3Url = AWS.getPutSignedUrl(key);
        var data = AWS.UploadFile(response.data,key);
        data.then(
            function(data) {                
                resolve(true);
            },
            function(err) {
                reject(err);
            }
          );
        });
    });
}

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
            url: fileName,
            processedUrl: imageFilterPrefix + fileName
    });

    const saved_item = await item.save();
    saved_item.url = AWS.getGetSignedUrl(saved_item.url);

    //Call image filter service and then send streams it to s3 aws
    const image = await callImageFilterAndUploadToAws(req, saved_item.url, saved_item.processedUrl)
    .catch((err) => { 
           console.log(err);
           return res.status(422).send({ message: 'unable to process image' });
    })

    saved_item.processedUrl = AWS.getGetSignedUrl(saved_item.processedUrl);
    
    res.status(201).send(saved_item);
});

export const FeedRouter: Router = router;