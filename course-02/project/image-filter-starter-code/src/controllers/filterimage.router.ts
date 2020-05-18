import { Router, Request, Response } from 'express';
import {filterImageFromURL, deleteLocalFiles} from '../util/util';

import {BAD_REQUEST,OK, INTERNAL_SERVER_ERROR, NOT_FOUND} from 'http-status-codes'
const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {    
    console.log("filterimage called")
    const imageUrl = req.query.image_url
    console.log(imageUrl)

    if(!imageUrl) {
        return res.status(BAD_REQUEST).send(`the URL '${imageUrl}' is not in the expected format`)
    }

    try {
        const parsedUrl = new URL(imageUrl)
    } catch (TypeError) {
        return res.status(BAD_REQUEST).send(`the URL '${imageUrl}' is not in the expected format`)
    }

    try {
        const tempFileName =  await filterImageFromURL(imageUrl)
        // res.sendFile(tempFileName)
        res.sendFile(tempFileName, (_) => {deleteLocalFiles([tempFileName])})

        try {
            // deleteLocalFiles([tempFileName])
        }
        catch(TypeError) {
            console.error(`deleting ${tempFileName} failed`)
            //ignore
        }
        return 
    }
    catch(TypeError) {
        return res.status(NOT_FOUND).send("Not found")
        
    }
    // one.then(value => {
    //     console.log('resolved', value);
    //     res.sendFile(value, (err) => {deleteLocalFiles([value])})
    //   }); // TODO: Move to finally
    //   one.catch(error => {
    //     console.log('rejected', error);
    //     res.status(NOT_FOUND).send(error)
    //   });

      

      

    // res.status(OK).send(`OK`);
});

export const FilterImageRouter: Router = router;