import express from 'express';
import { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import { requireAuth } from '../../users/routes/auth.router';
import { nextTick } from 'process';

const fs = require('fs');

const router: Router = Router();

// @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

router.get('/filteredimage/', async (req: Request, res: Response) => {
    let {image_url } = req.query;

    if (!image_url) {
      return res.status(400).send('image_url is required');
    }
    const new_image = await filterImageFromURL(<string>image_url);

    // set timeout in 3 second by 
    res.setTimeout(3000, function(){
      console.log('Request has timed out. The image is probably too heavy.');
      return res.status(408).send('Request has timed out. The image is probably too heavy or removed.');

    });

    // after finish the response, the image is deleted.
    res.on('finish', function() {
      try{
        const pathTemp =  __dirname + '/util/tmp';
        const filesToDelete = [];
        const files = fs.readdirSync(pathTemp);
        for (const file of files) {
          filesToDelete.push(pathTemp + '/' + file)
        }
        deleteLocalFiles(filesToDelete);
      }
      catch(error){
        console.log(error);
        return res.status(422).send('error when we try to delete temp file.');
      }
      
      });

    return res.sendFile(new_image);
});

export const ImageFilter: Router = router;