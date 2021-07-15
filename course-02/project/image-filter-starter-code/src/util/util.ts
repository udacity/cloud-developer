import fs from 'fs';
import { url } from 'inspector';
import Jimp = require('jimp');
const http = require('http');

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

export function isSupportedFormat(image_url: string) {
    let url_parts = image_url.split("\.")
    let suffix = url_parts[url_parts.length-1]

    if ((suffix === "jpg") || (suffix === "png")) {
        return true;
    }
    return false;
}

export async function doesFileExist(userUrl: string) {
    const myURL = new URL(userUrl);

    const options = {
        method: 'HEAD',
        hostname: myURL.hostname,
        path: myURL.pathname
    };

    let status = 0
    const req = http.request(options, (res: any) => {
        console.log(JSON.stringify(res.headers));
        console.log("STATUS RETURNED", res.statusCode);
        status = res.statusCode
    });
    console.log("status is ", status)
    req.end();

    if ((status > 200) && (status < 300)) {
        return true;
    }
    return false;
}

// export async function doesFileExist(url: string) {
//     // let xhr = new XMLHttpRequest();
//     let xhr = require("xmlhttprequest").XMLHttpRequest;

//     xhr.open('HEAD', url, false);
//     xhr.send();
     
//     return xhr.status !== 404;
// }