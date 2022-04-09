import * as AWS from 'aws-sdk'
import { XavcSlowPal } from 'aws-sdk/clients/mediaconvert';
import * as AWSXRay from 'aws-xray-sdk'

const XAWS = AWSXRay.captureAWS(AWS)

const s3 = new XAWS.S3({
    signatureVersion: 'v4'
})

export class AttachmentUtils {

    s3; // TODO:: set type
    groupsTable: string;
    attachmentsTable: string;
    bucketName: string;
    urlExpiration: string;
   
    constructor() {
        this.s3 = new XAWS.S3({
            signatureVersion: 'v4'
        })
        this.groupsTable = process.env.GROUPS_TABLE
        this.attachmentsTable = process.env.ATTACHMENTS_TABLE
        this.bucketName = process.env.ATTACHMENTS_S3_BUCKET
        this.urlExpiration = process.env.SIGNED_URL_EXPIRATION
    }

    async generateSignedUrl(attachmentId: string) {

        const params = {
            Bucket: this.bucketName,
            Key: attachmentId,
            Expires: this.urlExpiration
        }

        try {
        return s3.getSignedUrl('putObject', params)
        } catch (err) {
        return err
        }
    }
}
