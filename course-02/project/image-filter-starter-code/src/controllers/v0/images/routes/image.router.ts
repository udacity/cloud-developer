import { Router, Request, Response } from 'express';
import { filterImageFromURL, deleteLocalFiles } from '../../../../../src/util/util';
import validator from 'validator';

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
});

router.get('/filteredimage', async (req, res) => {
    let { image_url } = req.query;

    if (validator.isURL(image_url)) {
      try {
        const filteredpath = await filterImageFromURL(image_url);
        
        if (filteredpath && filteredpath.trim() != '') {
          res.status(200).sendFile(filteredpath, function(err) {
            if (err) {
              res.status(500).send(`Unexpected error ${ err.name } in sending the file: ${ err.message }`);
            }
            else {
              deleteLocalFiles([filteredpath]);
            }
          });
        }
      }
      catch(exc) {
        res.status(500).send(`Unexpected server error: ${ exc.message }`);
      }
    }

    else {
      res.status(400).send('Image URL is invalid!');
    }
  });

  export const ImageRouter: Router = router;
