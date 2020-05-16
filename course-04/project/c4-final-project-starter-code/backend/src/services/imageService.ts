import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import {createLogger} from "../utils/logger";
import * as NodeCache from 'node-cache';

const XAWS = AWSXRay.captureAWS(AWS)
const logger = createLogger("imageService")


const s3 = process.env.IS_OFFLINE ? new AWS.S3({
    signatureVersion: 'v4'
}) : new XAWS.S3({
    signatureVersion: 'v4'
})

const bucketName = process.env.IMAGES_S3_BUCKET
const urlExpiration = parseInt(process.env.SIGNED_URL_EXPIRATION)
const cache = new NodeCache({stdTTL: urlExpiration - 1, checkperiod: urlExpiration * 0.2, useClones: false});


export function getUploadUrl(todoId: string, userId: string) {
    return s3.getSignedUrl('putObject', {
        Bucket: bucketName,
        Key: `${todoId}_${userId}`,
        Expires: urlExpiration
    })
}

export function getDownloadUrl(todoId: string, userId: string): string {
    const key = `${todoId}_${userId}`;
    let url: string = cache.get(key);

    if (url) {
        logger.info('Read from cache')
        return url;
    }

    logger.info('Generating new url')
    url = s3.getSignedUrl('getObject', {
        Bucket: bucketName,
        Key: key,
        Expires: urlExpiration
    })

    cache.set(key, url)
    return url;
}

export async function deleteImage(todoId: string, userId: string) {
    await s3.deleteObject({
        Bucket: bucketName,
        Key: `${todoId}_${userId}`
    }).promise()
}
