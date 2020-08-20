import fs from 'fs';
import Jimp = require('jimp');
const path = require('path');
const fsPromises = fs.promises;

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string>{
    return new Promise( async resolve => {
        const photo = await Jimp.read(inputURL);
        const outpath = '/tmp/filtered.'+Math.floor(Math.random() * 2000)+'.jpg';
        await photo
        .resize(256, 256) // resize
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .write(__dirname+outpath, (img)=>{
            resolve(__dirname+outpath);
        });
    });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files:Array<string>){
    for( let file of files) {
        fs.unlinkSync(file);
    }
}

// getLocalFilesUrl
// helper function to retrieve files on local disk 
// return array that includes absolute path of local files
// RETURNS
//    array of an absolute path of locally saved filtered image files
export async function getLocalFilesUrls(): Promise<Array<string>>{
    const directoryPath = path.join(__dirname, 'tmp');
    let files = await fsPromises.readdir(directoryPath);
    files = files.map(file => __dirname + "/tmp/" + file);
    return files;
}