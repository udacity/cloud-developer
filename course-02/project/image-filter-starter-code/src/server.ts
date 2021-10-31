import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import validUrl from 'valid-url';
import {config} from "./config";

(async () => {

    // Init the Express application
    const app = express();

    // Set the network port
    const port = config.dev.port;

    // Use the body parser middleware for post requests
    app.use(bodyParser.json());

    // GET /filteredimage?image_url={{URL}}
    // endpoint to filter an image from a public url.
    // QUERY PARAMATERS
    //    image_url: URL of a publicly accessible image
    // RETURNS
    //   the filtered image file
    app.get("/filteredimage", async (req, res) => {
        let image_url: string = req.query.image_url;

        // Validation
        if (!validUrl.isWebUri(image_url)) {
            res.status(400).send({message: 'Image URL is required or malformed'});
        }

        // The actual task
        try {
            filterImageFromURL(image_url)
                .then(filteredImagePath =>
                    res.sendFile(filteredImagePath, () => {
                        deleteLocalFiles([filteredImagePath]);
                    })
                )
                .catch(_ => {
                    res.status(500).send({message: "Image processing failed"});
                });
        } catch (e) {
            // I know it should be a different code, but this one is much more fun :)
            res.status(418).send({message: "Unknown error"});
        }
    });

    // Root Endpoint
    // Displays a simple message to the user
    app.get("/", async (req, res) => {
        res.send("try GET /filteredimage?image_url={{}}")
    });


    // Start the Server
    app.listen(port, () => {
        console.log(`server running http://localhost:${port}`);
        console.log(`press CTRL+C to stop server`);
    });
})();