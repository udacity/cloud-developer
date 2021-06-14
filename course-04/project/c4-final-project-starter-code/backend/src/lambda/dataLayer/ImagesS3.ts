import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

const XAWS = AWSXRay.captureAWS(AWS)

export class ImagesS3 {
  constructor(
    private readonly imagesS3Bucket = process.env.S3_BUCKET,
    private readonly s3 = new XAWS.S3({ signatureVersion: 'v4' })
  ) {}

  generateUploadURL(todoId: string, expires: string) {
    const imgObj = { Bucket: this.imagesS3Bucket, Key: todoId, Expires: expires }
    return this.s3.getSignedUrl('putObject', imgObj)
  }
}
