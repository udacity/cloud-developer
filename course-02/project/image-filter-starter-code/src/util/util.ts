import { reject } from 'bluebird';
import fs from 'fs';
import Jimp = require('jimp');

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string> {
    try {
        const image = await Jimp.read(inputURL);
        const tmpPath = '/tmp/filtered.' + Math.floor(Math.random() * 2000) + '.jpg';
        const outPath = __dirname + tmpPath
        await image.resize(256, 256) // resize
            .quality(60) // set JPEG quality
            .greyscale() // set greyscale
            .writeAsync(outPath);
        return outPath;
    } catch (error) {
        console.log(error.message);
        throw new Error("Couldn't process resource");
    }
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

export function isUrl(testUrl: string) {
    try {
        const url = new URL(testUrl);
        return url.protocol === "http:" || url.protocol === "https:";
    } catch (_) {
        return false;
    }
}