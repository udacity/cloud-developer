import { SNSEvent, SNSHandler, S3EventRecord } from 'aws-lambda'
import 'source-map-support/register'
import * as AWS from 'aws-sdk'
import Jimp from 'jimp/es'

const s3 = new AWS.S3()

const imagesBucketName = process.env.IMAGES_S3_BUCKET
const thumbnailBucketName = process.env.THUMBNAILS_S3_BUCKET

export const handler: SNSHandler = async (event: SNSEvent) => {
    console.log('Processing SNS event ', JSON.stringify(event))

    for (const snsRecord of event.Records) {
        const s3EventStr = snsRecord.Sns.Message
        console.log('Processing S3 event', s3EventStr)
        const s3Event = JSON.parse(s3EventStr)

        for (const record of s3Event.Records) {
            await processImage(record)
        }
    }
}

async function processImage(record: S3EventRecord) {
    const key = record.s3.object.key
    const response = await s3.getObject({
        Bucket: imagesBucketName,
        Key: key
    }).promise()

    // @ts-ignore
    const body: Buffer = response.Body
    const image = await Jimp.read(body)
    image.resize(150, Jimp.AUTO)
    const convertedBuffer = await image.getBufferAsync(Jimp.AUTO)

    await s3.putObject({
      Bucket: thumbnailBucketName,
      Key: `${key}.jpeg`,
      Body: convertedBuffer
    }).promise()
}