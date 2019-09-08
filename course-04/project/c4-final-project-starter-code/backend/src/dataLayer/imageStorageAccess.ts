import * as AWS from "aws-sdk";

const bucketName = process.env.TODO_IMAGES_S3_BUCKET;
const urlExpiration = process.env.SIGNED_URL_EXPIRATION;
const s3 = new AWS.S3({
    signatureVersion: 'v4'
})

export function getUploadUrl(imageId: string) {
    return s3.getSignedUrl('putObject', {
        Bucket: bucketName,
        Key: imageId,
        Expires: urlExpiration
    })
}
