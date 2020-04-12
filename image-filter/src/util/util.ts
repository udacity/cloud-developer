import fs   from 'fs';
import Jimp from 'jimp';


// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string>{
    return new Promise(resolve => {
        Jimp.read(inputURL)
          .then(photo => {
              const outpath: string = '/tmp/filtered.' + Math.floor(Math.random() * 2000) + '.jpg';
              return photo
                .resize(256, 256) // resize
                .quality(60) // set JPEG quality
                .greyscale() // set greyscale
                .write(__dirname + outpath, (img)=>{
                    resolve(__dirname + outpath);
                });
          })
          .catch(() => {
              resolve('Not valid');
          });
    });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files: Array<string>){
    const pathToFile: string = __dirname + /tmp/;
    for (let file of files) {
        fs.unlinkSync(pathToFile + file);
    }
}