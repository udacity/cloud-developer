import { Router, Request, Response } from 'express';
import {filterImageFromURL, deleteLocalFiles} from '../util/util';

import {BAD_REQUEST,OK, INTERNAL_SERVER_ERROR, NOT_FOUND} from 'http-status-codes'
const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {    
    const imageUrl = req.query.image_url

    console.log(`filterimage called for ${imageUrl}`)
    if(!imageUrl) {
        return res.status(BAD_REQUEST).send(`the image URL cannot be empty`)
    }

    try {
        const parsedUrl = new URL(imageUrl)
    } catch (TypeError) {
        return res.status(BAD_REQUEST).send(`the URL '${imageUrl}' is not in the expected format`)
    }

    try {
        const tempFileName =  await filterImageFromURL(imageUrl)
        res.sendFile(tempFileName, (_) => {deleteLocalFiles([tempFileName])})
        return 
    }
    catch(TypeError) {
        return res.status(NOT_FOUND).send("Not found")
    }
});

export const FilterImageRouter: Router = router;