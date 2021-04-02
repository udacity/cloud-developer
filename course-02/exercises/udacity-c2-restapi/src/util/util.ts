import fs from 'fs';
import { Request } from 'express';

// deleteLocalFiles
// helper function to delete a file on the local disk
// useful to cleanup after tasks
// INPUTS
//    file: Absolute path to file
export async function deleteLocalFile(file: string){
    fs.unlinkSync(file);
}

// deleteLocalFiles
// helper function to delete a file on the local disk
// useful to cleanup after tasks
// INPUTS
//    file: Absolute path to file
export function saveLocalTempFile(data: any): string{
    var f=fs.createWriteStream('/tmp/file.jpeg');
    f.write(data);
    f.end();
    return "/tmp/file.jpeg"
}

export function extractToken(req: Request): string {
    if (!req.headers || !req.headers.authorization){
        return ""
    }

    const token_bearer = req.headers.authorization.split(' ');
    if(token_bearer.length != 2){
        return ""
    }

    return token_bearer[1];
}
