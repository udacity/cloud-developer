import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { S3 } from 'aws-sdk'
import { config } from '../config'


const XAWS = AWSXRay.captureAWS(AWS)


export default class AttachmentsStorage {
    constructor(
        private readonly s3Client: S3 = new XAWS.S3({
            signatureVersion: 'v4'
        }),
        private readonly imagesBucket = config.s3Bucket,
        private readonly signedUrlExpireSeconds = 60 * 10
    ) { }

    async getAttachmentUrl(todoId: string): Promise<string | null> {
        try {
            await this.s3Client.headObject({
                Bucket: this.imagesBucket,
                Key: `${todoId}.png`
            }).promise();

            return this.s3Client.getSignedUrl('getObject', {
                Bucket: process.env.IMAGES_BUCKET,
                Key: `${todoId}.png`,
                Expires: this.signedUrlExpireSeconds
            });
        } catch (err) {
            return null
        }
    }

    getPresignedUrl(todoId: string): string {
        return this.s3Client.getSignedUrl('putObject', {
            Bucket: process.env.IMAGES_BUCKET,
            Key: `${todoId}.png`,
            Expires: this.signedUrlExpireSeconds
        })
    }
}