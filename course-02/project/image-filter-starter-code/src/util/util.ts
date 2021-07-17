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
    return new Promise( async resolve => { 
        try {
            const photo = await Jimp.read(inputURL);
            const outpath = '/tmp/filtered.'+Math.floor(Math.random() * 2000)+'.jpg';
            await photo
            .resize(256, 256) // resize
            .quality(60) // set JPEG quality
            .greyscale() // set greyscale
            .write(__dirname+outpath, (img)=>{
                resolve(__dirname+outpath);});
        }
        catch (error) { 
            resolve("error"); 
        }
   });
}
// deleteLocalFiles
// This helper function deletes files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files:Array<string>){
    for( let file of files) {
        fs.unlinkSync(file);
    }
}

export async function isSupportedFormat(image_url: string) {
    let url_parts = image_url.split("\.")
    let suffix = url_parts[url_parts.length-1].toLowerCase()
    if ((suffix === "jpg") || (suffix === "jpeg")) {
        return true;
    }
    return false;
}
