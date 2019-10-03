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
    let photo: Jimp;
    try {
        photo = await Jimp.read(inputURL);
    } catch (error) {
        console.error("Could not read the file from the link provided.");
        return new Promise((resolve, reject) => {
            return reject("Could not read the file from the link provided.")
        });
    }

    return new Promise(async resolve => {
        const outpath = '/tmp/filtered.' + Math.floor(Math.random() * 2000) + '.jpg';
        await photo
            .resize(256, 256) // resize
            .quality(60) // set JPEG quality
            .greyscale() // set greyscale
            .write(__dirname + outpath, (img) => {
                resolve(__dirname + outpath);
            });
    });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files: Array<string>) {
    for (let file of files) {
        if (file) {
            try {
                fs.unlinkSync(file);
            } catch (error) {
                console.error("Error deleting the file : ", error);
            }
        }

    }
}

export function getTempFiles(currFile: string) {
    return fs.readdirSync(__dirname + '/tmp').filter(file => currFile !== __dirname + '/tmp/' + file).map(file => __dirname + '/tmp/' + file);
}
