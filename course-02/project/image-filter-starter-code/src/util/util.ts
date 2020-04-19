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
    return new Promise( async (resolve) => {
        try{
        const photo = await Jimp.read(inputURL);
        console.log(photo);
        const outpath = '/tmp/filtered.'+Math.floor(Math.random() * 2000)+'.jpg';
        await photo
        .resize(256, 256) // resize
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .write(__dirname+outpath, (img)=>{
            console.log(__dirname+outpath);
            resolve(__dirname+outpath);
        });
    }
    catch (error){

        console.log(error)
        resolve("An error has occured");
    }

    });
}



// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files:Array<string>){
    const path = require('path');
    for( let file of files) {
        const directoryPath = path.join(__dirname, 'tmp', file);
        fs.unlinkSync(directoryPath);
    }
}


export function deleteTheTempFiles(){
    const path = require('path');
    const fs = require('fs');
    //joining path of directory 
    const directoryPath = path.join(__dirname, 'tmp');
    //passsing directoryPath and callback function
    fs.readdir(directoryPath, function (err: string, files: any[]) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        //listing all files using forEach
        deleteLocalFiles(files);
    });
  }
