import * as AWS from 'aws-sdk'
// import { XavcSlowPal } from 'aws-sdk/clients/mediaconvert';
import * as AWSXRay from 'aws-xray-sdk'

const XAWS = AWSXRay.captureAWS(AWS)

const s3 = new XAWS.S3({
    signatureVersion: 'v4'
})

export class AttachmentUtils {

    s3;
    bucketName: string;
    urlExpiration: string;
   
    constructor() {
        this.s3 = new XAWS.S3({
            signatureVersion: 'v4'
        })
        this.bucketName = process.env.ATTACHMENT_S3_BUCKET
        this.urlExpiration = process.env.SIGNED_URL_EXPIRATION
    }

    async generateSignedUrl(attachmentId: string) {

        const params = {
            Bucket: this.bucketName,
            Key: attachmentId,
            Expires: this.urlExpiration
        }

        try {
            let singedUrl = s3.getSignedUrl('putObject', params)
            return singedUrl
        } catch (err) {
            console.log("Failed to get singed URL: " + err.message)
        return err
        }
    }
}
