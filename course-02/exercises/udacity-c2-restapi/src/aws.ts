import AWS = require('aws-sdk');
import { config } from './config/config';
import { S3 } from 'aws-sdk';

const c = config.dev;

if(c.aws_profile !== "DEPLOYED") {
  var credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
  AWS.config.credentials = credentials;
}

export const s3 = new AWS.S3({
  signatureVersion: 'v4',
  region: c.aws_region,
  params: {Bucket: c.aws_media_bucket}
});

export async function UploadFile(filestream: any,name :string) : Promise<S3.ManagedUpload.SendData> {
  var upload = new AWS.S3.ManagedUpload({
    params: {Bucket: c.aws_media_bucket, Key: name, Body: filestream}
  });
  return upload.promise();
}


/* getGetSignedUrl generates an aws signed url to retreive an item
 * @Params
 *    key: string - the filename to be put into the s3 bucket
 * @Returns:
 *    a url as a string
 */
export function getGetSignedUrl( key: string ): string{

    const signedUrlExpireSeconds = 60 * 5

    const url = s3.getSignedUrl('getObject', {
        Bucket: c.aws_media_bucket,
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
      Bucket: c.aws_media_bucket,
      Key: key,
      Expires: signedUrlExpireSeconds
    });

    return url;
}
