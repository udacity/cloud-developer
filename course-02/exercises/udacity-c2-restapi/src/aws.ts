import AWS = require('aws-sdk');
import { config } from './config/config';
import fs from 'fs';

const c = config.aws;

//Configure AWS
if (c.profile !== "DEPLOYED") {
  var credentials = new AWS.SharedIniFileCredentials({profile: c.profile, filename: ".aws"});
  AWS.config.credentials = credentials;
}

export const s3 = new AWS.S3({
  signatureVersion: 'v4',
  region: c.region,
  params: {Bucket: c.media_bucket}
});


/* getGetSignedUrl generates an aws signed url to retreive an item
 * @Params
 *    key: string - the filename to be put into the s3 bucket
 * @Returns:
 *    a url as a string
 */
export function getGetSignedUrl( key: string ): string{

  const signedUrlExpireSeconds = 60 * 5

    const url = s3.getSignedUrl('getObject', {
        Bucket: c.media_bucket,
        Key: key,
        Expires: signedUrlExpireSeconds
      });

    return url;
}

/* getPutSignedUrl generates an aws signed url to put an item
 * @Params
 *    key: string - the filename to be retreived from s3 bucket
 * @Returns:
 *    a url as a string
 */
export function getPutSignedUrl( key: string ){

    const signedUrlExpireSeconds = 60 * 5

    const url = s3.getSignedUrl('putObject', {
      Bucket: c.media_bucket,
      Key: key,
      Expires: signedUrlExpireSeconds
    });

    return url;
}

/* uploadFile uploads a file to S3 bucket
 * @Params
 *    path: string - the path to local file
 *    fileName: string - the name of the file to save on S3
 */
export function uploadFile( path: string, fileName: string ) {
  const fileContent = fs.readFileSync(path);

  const params = {
      Bucket: c.media_bucket,
      Key: fileName,
      Body: fileContent
  };

  return s3.upload(params, function(err: any, data: any) {
      if (err) {
          throw err;
      }
  }).promise();
}
