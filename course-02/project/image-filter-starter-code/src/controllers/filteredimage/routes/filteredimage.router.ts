import { Router, Request, Response } from 'express';
import {filterImageFromURL, deleteLocalFiles} from '../../../util/util';

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
        const filteredpath: string = await filterImageFromURL(imageURL);
        res.status(200).sendFile(filteredpath, async (error) => {
            if (error) {
                res.status(422).send({error: error});
            } else {
                // delete files
                await deleteLocalFiles([filteredpath]);
            }
        });

    } catch (error) {
        res.status(422).send({error: error});
    }

});

export const FilteredImageRouter: Router = router;