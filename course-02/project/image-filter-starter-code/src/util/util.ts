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
        let photo = null;
        try {
            photo = await Jimp.read(inputURL);
        } catch (error) {
            reject(error);
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
export async function deleteLocalFiles(files:Array<string>): Promise<any>{
    const promises = new Array();
    for( let file of files) {
        promises.push(new Promise( async (resolve, reject) => {
            fs.unlink(file, (err) => {
                if (err) {
                    resolve(file) // TODO log for future deleting task
                    return
                }
                resolve();
            });
        }));
    }
    return Promise.all(promises);
}