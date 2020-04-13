import { Router, Request, Response } from 'express';
import Index = require("@types/express/index");
import Util = require("../../util/util");
//import filterImageFromURL = Utils.filterImageFromURL;



const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
    
    res.status(200).send("imagefeed.router");
});

//http://localhost:8082/api/v0/feed/imagefilter/filteredImage?image_url=C:\Clemens\Personal\DW\dw.jpg
router.get('/imagefilter', async (req: Request, res: Response) => {
    image_url: String;

    let { image_url } = req.query;
   // res.send(image_url);
    if (image_url) {

      let imglength = image_url.length;
    let fileExtension = image_url.substring(imglength - 4);

    if (fileExtension != ".jpg") {

      res.status(422).send("File must be .jpg type");
    }

    res.on('finish', function () {
     Util.deleteLocalFiles([filteredpath]);
    });

    const filteredpath = await Util.filterImageFromURL(image_url);
   
    res.status(200).sendFile(filteredpath);

    }
    else {
      res.status(400).send("image_url not specified");

    }

});



export const ImageFeedRouter: Router = router;



