import fs from 'fs';
import Jimp = require('jimp');

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string>{
    return new Promise( async (resolve, reject) => {
        var photo;

        try {
            photo = await Jimp.read(inputURL);
        } catch {
            reject(new Error("Bad image URL"))
        }

        const outpath = '/tmp/filtered.'+Math.floor(Math.random() * 2000)+'.jpg';

        try {
            await photo
            .resize(256, 256) // resize
            .quality(60) // set JPEG quality
            .greyscale() // set greyscale
            .write(__dirname+outpath, (img)=>{
                resolve(__dirname+outpath);
            });
        } catch {
            reject(new Error("An error occurred while filtering the image"))
        }
    });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    None
export async function deleteLocalFiles(){
    const dir = `${__dirname}/tmp/`;
    fs.readdir(dir, (error, files) => {
        if (error) {
          return console.log('Unable to scan directory: ' + error);
        }
        for( let file of files) {
            fs.unlinkSync(`${__dirname}/tmp/${file}`);
        }
    });
}