import {S3Event, SNSEvent, SNSHandler} from 'aws-lambda'
import 'source-map-support/register'

import {createLogger} from "../../utils/logger";
import {updateImageUploaded} from "../../services/todoService";

const logger = createLogger("setDownloadUrl")

export const handler: SNSHandler = async (event: SNSEvent) => {
    logger.info('Processing SNS event ', JSON.stringify(event))

    for (const snsRecord of event.Records) {
        const s3EventStr = snsRecord.Sns.Message
        logger.info('Processing S3 event', s3EventStr)
        const s3Event = JSON.parse(s3EventStr)

        await processS3Event(s3Event)
    }
}

async function processS3Event(s3Event: S3Event) {
    for (const record of s3Event.Records) {
        const key = record.s3.object.key
        logger.info('Processing S3 item with key: ' + key, key)
        const index = key.indexOf('_');
        const todoId = key.substr(0, index)
        const userId = decodeURI(key.substr(index + 1))
        await updateImageUploaded(todoId, userId);
    }
}
