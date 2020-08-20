import { Router, Request, Response } from 'express';
import { requireAuth } from '../../users/routes/auth.router';
import {filterImageFromURL, deleteLocalFiles, getLocalFilesUrls} from '../../../../util/util';

const router: Router = Router();

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
router.get('/', 
    requireAuth, 
    async (req: Request, res: Response) => {
    let { image_url } = req.query;
    const image_url_lowercase = image_url.toLowerCase();
    if(!image_url) 
        return res.status(400).send("Image Url is required");

    if(!image_url.includes('http')) 
        return res.status(400).send("Image Url must be accessible");

    if(!image_url_lowercase.includes('jpeg') && !image_url_lowercase.includes('jpg') && 
        !image_url_lowercase.includes('png') && !image_url_lowercase.includes('bmp')) 
        return res.status(400).send("Target Image Type can be only jpeg,png,bmp");    
    try {
        const filteredpath = await filterImageFromURL(image_url);
        await res.status(200).sendFile(filteredpath,async (err) => {
            if (err) {
                return res.status(422).send("Fail to filter image!");  
            } else {
                const tmpfiles = await getLocalFilesUrls();
                await deleteLocalFiles(tmpfiles);
            }
        });
    } catch (error) {
        return res.status(422).send("Fail to filter image!");
    }
    
});

export const ImageFilterRouter: Router = router;