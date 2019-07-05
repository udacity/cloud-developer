import {Router, Request, Response} from 'express';
import {filterImageFromURL} from "../../util/util";
import {read, open, readFileSync,unlinkSync} from "fs";
const router: Router = Router();

// We will not catergorie this fucntion as th
router.get('/filteredimage',
    async (req: Request, res: Response) => {
        const imageUrl = req.query.image_url;

        if (!imageUrl) {
            return res.status(422).send({message: 'Image url is required'});
        }
        if(!validURL(imageUrl)){
            return res.status(422).send({message: 'Image url is not valid'});
        }

        const photoPath: string = await filterImageFromURL(imageUrl);
        var data: Buffer = readFileSync(photoPath);
        res.status(200).send(data);
        unlinkSync(photoPath);
        return;
    });

// Stackoverflow https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
function validURL(str: string) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}

router.get('/', async (req: Request, res: Response) => {
    res.send(`V0`);
});

export const IndexRouter: Router = router;