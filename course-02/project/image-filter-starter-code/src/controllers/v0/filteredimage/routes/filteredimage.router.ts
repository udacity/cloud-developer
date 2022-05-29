import { Router, Request, Response } from 'express';
import {filterImageFromURL, deleteLocalFiles} from '../../../../util/util';


const router: Router = Router();


router.get('/', async (req: Request, res: Response) => {
    const imageURL = req.query.image_url as string;

    if (!imageURL) {
        return res.status(400).send({
            statusCode: 400,
            message: 'Please provide a valid link to the image'
        });
    }

    try {
        // filter the image
        const filteredImageURL: string = await filterImageFromURL(imageURL);
        res.status(200).sendFile(filteredImageURL);
        await deleteLocalFiles([filteredImageURL]);
    } catch (error) {
        res.status(422).send({error: error});
    }

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

  /**************************************************************************** */

  //! END @TODO1

});

export const FilteredImageRouter: Router = router;