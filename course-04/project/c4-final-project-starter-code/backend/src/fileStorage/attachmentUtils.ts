import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { S3 } from 'aws-sdk'

const XAWS = AWSXRay.captureAWS(AWS)

export class AttachmentUtils {
    constructor(
      private readonly s3: S3 = new XAWS.S3({ signatureVersion: 'v4' }),
      private readonly bucketName = process.env.ATTACHMENT_S3_BUCKET,
      private readonly urlExpiration = parseInt(process.env.SIGNED_URL_EXPIRATION)
    ) {}
  
    async getAttachmentUrl(id: string): Promise<string> {
      return `https://${this.bucketName}.s3.amazonaws.com/${id}`
    }
  
    async getUploadUrl(id: string): Promise<string> {
      return this.s3.getSignedUrl('putObject', {
        Bucket: this.bucketName,
        Key: id,
        Expires: this.urlExpiration
      })
    }
  }
  