import AWS = require('aws-sdk');
import { config } from './config/config';

const c = config.dev;

//Configure AWS
if(c.aws.aws_profile !== "DEPLOYED") {
  var credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
  AWS.config.credentials = credentials;
}

export const s3 = new AWS.S3({
  signatureVersion: 'v4',
  region: c.aws.aws_region,
  params: {Bucket: c.aws.aws_media_bucket}
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
        Bucket: c.aws.aws_media_bucket,
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
    var url;
    console.log( `Getting Signed URL for putObject` );
    console.log( `Creds` );
    console.log(AWS.config.credentials)
    try {
      url = s3.getSignedUrl('putObject', {
        Bucket: c.aws.aws_media_bucket,
        Key: key,
        Expires: signedUrlExpireSeconds
      });
      console.log( `Fetched Signed URL for putObject` );
      console.log(url);
    } catch (error) {
      console.log( `Error getting SIGNED URL` );
      console.log(error);
    }

    return url;
}
