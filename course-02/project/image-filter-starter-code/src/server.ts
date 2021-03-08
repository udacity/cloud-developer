import express from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util';

(async () => {
  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // Root Endpoint

  // Displays a simple message to the user
  app.get('/', async (req, res) => {
    res.send('try GET /filteredimage?image_url={{}}');
  });

  // filter image
  app.get('/filteredimage', async (req, res) => {
    if (req.query.image_url) {
      const imageUrl = req.query.image_url;

      try {
        const filteredpath = await filterImageFromURL(imageUrl);

        if (filteredpath) {
          res.statusCode = 200;

          // the callback deletes the file after it was sended
          await res.sendFile(filteredpath, (err) => {
            if (!err) {
              deleteLocalFiles([filteredpath]);
            }
          });
        }
      } catch (error) {
        res.statusCode = 500;
        res.send(`Error filtering the image: ${error}`);
      }
    } else {
      res.statusCode = 400;
      res.send('Please provide a image url');
    }
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
