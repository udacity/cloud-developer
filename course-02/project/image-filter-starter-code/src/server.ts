import express from "express";
import bodyParser from "body-parser";
import {deleteLocalFiles, filterImageFromURL} from "./util/util";

(async () => {

    // Init the Express application
    const app = express();

    // Set the network port
    const port = process.env.PORT || 8082;

    // Use the body parser middleware for post requests
    app.use(bodyParser.json());

    app.get("/filteredimage", async (req, res) => {

        const image_url = req.query.image_url || ""
        if (!image_url) {
            return res.status(422).send({
                message: 'image_url is mandatory'
            });
        }

        const filteredpath = await filterImageFromURL(image_url)

        res.sendFile(filteredpath, () => {
            deleteLocalFiles([filteredpath])
        })

    });

    // Root Endpoint
    app.get("/", async (req, res) => {
        res.send("try GET /filteredimage?image_url={{}}")
    });

    // Start the Server
    app.listen(port, () => {
        console.log(`server running http://localhost:${ port }`);
        console.log(`press CTRL+C to stop server`);
    });
})();