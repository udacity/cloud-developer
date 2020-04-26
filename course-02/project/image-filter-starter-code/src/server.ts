import express from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util';
import { validateImageUrl, ValidatorConstants } from "./util/validator";
import { constants } from "http2";

(async () => {

    // Init the Express application
    const app = express();

    // Set the network port
    const port = process.env.PORT || 8082;

    // Use the body parser middleware for post requests
    app.use(bodyParser.json());

    /**
     * Validate and filters an input image url
     */
    app.get("/filteredimage", async (req, res) => {
        const {image_url} = req.query;

        // 1. validate the image url
        const isImagePromise = validateImageUrl(image_url);

        await isImagePromise.then(async validatorResponse => {
            switch (validatorResponse) {
                case ValidatorConstants.OK: {
                    // 2. filter the image
                    const filteredImagePromise = filterImageFromURL(image_url);

                    // 3. send the resulting file in the response
                    await filteredImagePromise.then((path) => {
                        // send the file
                        res.status(constants.HTTP_STATUS_OK).sendFile(path);

                        // delete files on server only after sending the response
                        res.on('finish', () => {
                            deleteLocalFiles([path]);
                        });
                    }, (err) => {
                        // if filtering failed for any reason, send an error
                        res.status(constants.HTTP_STATUS_UNPROCESSABLE_ENTITY).send({error: 'could not filter image: Internal server error'});
                    });
                    break;
                }
                case ValidatorConstants.NOT_AN_IMAGE: {
                    // if image_url param is not a valid image, send an error
                    res.status(constants.HTTP_STATUS_BAD_REQUEST).send({error: 'image_url query param is not a valid image'});
                    break;
                }
                case ValidatorConstants.NOT_A_VALID_URL: {
                    // if image_url param is not a valid image, send an error
                    res.status(constants.HTTP_STATUS_BAD_REQUEST).send({error: 'image_url query param is not a valid url'});
                    break;
                }
            }
        });
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
