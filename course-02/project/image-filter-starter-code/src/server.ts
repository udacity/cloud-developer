import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'

import { filterImageFromURL, deleteLocalFiles } from './util/util'

(async () => {
  // Init the Express application
  const app = express()

  // Set the network port
  const port = process.env.PORT || 8082

  // Use the body parser middleware for post requests
  app.use(bodyParser.json())

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
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

  app.get('/filteredimage', ({ query }: Request, response: Response) => {
    const imageUrl: string = query.image_url

    if (!imageUrl) {
      console.error('No image URL was supplied')
      return response.status(400)
        .json({
          message: 'No image URL was supplied'
        })
    }

    const formatResponse = (path: string) => {
      console.info('Path extracted from URL', JSON.stringify({ path }))
      return response.status(200)
        .sendFile(path, () => {
          deleteLocalFiles([ path ])
        })
    }

    const handleError = (error: Error) => {
      console.error('Image could not be processed', JSON.stringify({ message: error.message }))
      return response.status(422)
        .json({
          message: 'Image could not be processed'
        })
    }

    return filterImageFromURL(imageUrl)
      .then(formatResponse)
      .catch(handleError)
  })

  //! END @TODO1

  // Root Endpoint
  // Displays a simple message to the user
  app.get('/', (req, res) => {
    res.send('try GET /filteredimage?image_url={{}}')
  })


  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`)
    console.log(`press CTRL+C to stop server`)
  })
})()
