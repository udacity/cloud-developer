import AWS = require('aws-sdk');
import { config } from './config/config';

const c = config.aws;

//Configure AWS

var credentials = new AWS.SharedIniFileCredentials({profile: c.aws_profile});
AWS.config.credentials = credentials;

// fixed "CredentialsError: Missing credentials in config"
// https://stackoverflow.com/questions/26284181/aws-missing-credentials-when-i-try-send-something-to-my-s3-bucket-node-js
AWS.config.update({
  accessKeyId: c.aws_access_key_id,
  secretAccessKey: c.aws_secret_access_key,
  region: c.aws_region 
}); // for simplicity. In prod, use loadConfigFromFile, or env variables

export const s3 = new AWS.S3({
  signatureVersion: 'v4',
  region: c.aws_region,
  params: {Bucket: c.aws_media_bucket}
});


/* getGetSignedUrl generates an aws signed url to retreive an item
 * @Params
 *    key: string - the filename to be put into the s3 bucket
 * @Returns:
 *    a url as a string
 */
export function getGetSignedUrl( key: string ): string{
  console.info('Processing getGetSignedUrl for ', key);
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
export async function getPutSignedUrl( key: string ): Promise<string> {
    console.info('Processing getPutSignedUrl for ', key);
    const signedUrlExpireSeconds = 60 * 5

    // fix "https://s3.<region>.amazonaws.com/" returned as a response
    // see https://github.com/aws/aws-sdk-js/issues/2918
    // https://github.com/aws/aws-sdk-js/blob/master/CHANGELOG.md#25200
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getSignedUrlPromise-property
    const url = await s3.getSignedUrlPromise('putObject', {
      Bucket: c.aws_media_bucket,
      Key: key,
      Expires: signedUrlExpireSeconds
    });

    return url;
}
