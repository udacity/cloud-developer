import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

const XAWS = AWSXRay.captureAWS(AWS)

// TODO: Implement the fileStogare logic
export class AttachmentUtils{

    constructor(
        private readonly s3 = new XAWS.S3({ signatureVersion: 'v4' }),
        private readonly bucketName = process.env.ATTACHMENTS_S3_BUCKET,
        private readonly urlExpiration = process.env.SIGNED_URL_EXPIRATION
      ) {}
    
      async getAttachmentUrl(attachmentId: string): Promise<string> {
          const attachmentUrl = `https://${this.bucketName}.s3.amazonaws.com/${attachmentId}`
          return attachmentUrl
      }
    
      async getUploadUrl(attachmentId: string): Promise<string> {
        const uploadUrl = this.s3.getSignedUrl('putObject', {
          Bucket: this.bucketName,
          Key: attachmentId,
          Expires: this.urlExpiration
        })
        return uploadUrl
      }
    
    }