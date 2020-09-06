import fs from 'fs';
import {Response} from "express";
import Jimp = require('jimp');

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
/**
 * okay, no clue why we get a async function, that returns a promise. that's unnecessary'.
 * if the process yields any errors, we can't catch it, because the promise doesn't handle reject case.
 * We can validate url input, but that would still result in unhandled errors, if the url is valid,
 * but doesn't exist anymore or other networking errors
 * fixed that.
 * removed promise completely and changed from write to writeAsync to get a promise to await.
 *
 * Also, the old code used __dirname, which is the directory of the file and not the project, which might get messy.
 * It's unnecessary anyway, because instead of writing to file, we can write the filtered image directly to the client,
 * saving disc i/o and processing time.
 */
export async function filterImageFromURL(inputURL: string): Promise<Jimp>{

    const photo: Jimp = await Jimp.read(inputURL);
    return photo
        .resize(256, 256) // resize
        .quality(60) // set JPEG quality
        .greyscale();
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

export function sendError(res: Response, errorCode: number, message: string) {
    return res.status(errorCode).send({message});
}