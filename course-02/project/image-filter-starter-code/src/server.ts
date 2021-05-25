import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import { resolve } from 'bluebird';
import { nextTick } from 'process';
import * as EmailValidator from 'email-validator';
import {  users  } from './User';
import { requireAuth, generateJWT } from './auth.router';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]
  
  app.get("/filteredimage", requireAuth, async (req, res, next) => {
    const url = req.query.image_url;
    if (url) {
      var resolvedUrl = await filterImageFromURL(url);
      res.sendFile(resolvedUrl, async function (err) {
        if (err) {
          console.log("Error when sending file!!!");
          next(err);
        } else {
          var arr = [];
          arr.push(resolvedUrl);
          await deleteLocalFiles(arr);
        }
      });
      return;
    } else {
      return res.status(400)
        .send(`Image URL is required`);
    }
  
  });

  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
    
  });
  
  app.post('/apiauth', async (req, res) => {
    const emailFromReq = req.body.email;
    const plainTextPassword = req.body.password;

    console.log(emailFromReq);
    console.log(plainTextPassword);
    var jwt = "";
    // check email is valid
    if (!emailFromReq || !EmailValidator.validate(emailFromReq)) {
      return res.status(400).send({ auth: false, message: 'Email is required or malformed' });
    }

    // check email password valid
    if (!plainTextPassword) {
      return res.status(400).send({ auth: false, message: 'Password is required' });
    }
    var found = false;
    // find the user
    users.forEach(user => {
      if (user.email == emailFromReq) {
        console.log("Match found!!!!");
        jwt = generateJWT(user.email);
        found = true;
        return;
      } 
    });
    if (found) {
      console.log(jwt);
      return res.status(201).send({ "token": jwt, "userEmail": emailFromReq });
    } else {
      return res.status(401).send({ "message": "user is not found !!!" });
    }
    
  });

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();