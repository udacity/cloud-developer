import express from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles, isValidUrl } from './util/util';

(async () => {
    // Init the Express application
    const app = express();

    // Set the network port
    const port = process.env.PORT || 8082;

    // Use the body parser middleware for post requests
    app.use(bodyParser.json());

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

    app.get('/filteredimage', async (req, res, next) => {
        const imageUrl = req.query.image_url;

        if (!isValidUrl(imageUrl)) {
            res.status(400).send({ error: 'image_url is not valid' });
        }

        const filePath = await filterImageFromURL(imageUrl).catch((err) => {
            // do something if we want to handle this error
        });

        if (!filePath) {
            res.status(422).send({ error: 'image cannot be loaded with the provided url' });
        } else {
            res.sendFile(filePath, {}, (err) => {
                if (err) {
                    next(err);
                }

                // delete the file after the file has been sent
                deleteLocalFiles([filePath]);
            });
        }
    });

    // Root Endpoint
    // Displays a simple message to the user
    app.get('/', async (req, res) => {
        res.send('try GET /filteredimage?image_url={{}}');
    });

    // Start the Server
    app.listen(port, () => {
        console.log(`server running http://localhost:${port}`);
        console.log(`press CTRL+C to stop server`);
    });
})();
