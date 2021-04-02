import axios from "axios";
import { config } from '../config/config'
import fs from 'fs';

const https = require('https');

const API_HOST = config.imagefilter.url;

// downloadFilteredImage
// helper function to call the image filter service and save the filtered image locally.
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function downloadFilteredImage(token: string, inputURL: string, path: string) {
  if (!API_HOST) {
    throw "Missing Image Filter host" 
  }
  const escaped_url = escape(inputURL)
  const url = API_HOST + escaped_url

  const response = await axios({
    url,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}` 
    },  
    responseType: 'stream'
  })

  const writer = fs.createWriteStream(path)
  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}
