import fs from "fs";
import Jimp from 'jimp';
import axios from "axios";

async function fetchImageFromURL (url: string): Promise<Buffer> {
  // see issue https://github.com/oliver-moran/jimp/issues/775 for why this is needed
  const response = await axios({
    method: 'get',
    url: url,
    responseType: 'arraybuffer'
  });

  return response.data;
}

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const image = await fetchImageFromURL(inputURL);
      const photo = await Jimp.read(image);
      const outpath =
        "/tmp/filtered." + Math.floor(Math.random() * 2000) + ".jpg";

      photo
        .resize(256, 256) // resize
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .write(__dirname + outpath, (img) => {
          resolve(__dirname + outpath);
        });
    } catch (error) {
      reject(error);
    }
  });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files: Array<string>) {
  for (let file of files) {
    fs.unlinkSync(file);
  }
}
