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
        const photo = await Jimp.read(inputURL);
        const outpath = '/tmp/filtered.'+Math.floor(Math.random() * 2000)+'.jpg';
        await photo
        .resize(256, 256) // resize
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .write(__dirname+outpath, (img)=>{
            resolve(__dirname+outpath);
        });
     //   console.log('');
    });

    
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files



export async function deleteLocalFiles(files:Array<string>){
   // let filen:Array<string>=['obj1','obj2','obj1','obj2'];

    for( let file of files) {
        fs.unlinkSync(file.toString());
        console.log('****************************************');
        console.log('file: '+file +' was deleted successfully');
    }


}