import { S3Event } from 'aws-lambda'
import { updateAttachmentURL } from '../../businessLogic/todoItems'

export const handler = async (event: S3Event) => {
    console.log(JSON.stringify(event))

    for (const element of event.Records)  {
        const objectId = element.s3.object.key
        const attachmentUrl = `https://todo-att-bucket-${process.env.STAGE}.s3.eu-central-1.amazonaws.com/${objectId}` 
        const wasSuccessful = await updateAttachmentURL(objectId, attachmentUrl)
        if (wasSuccessful == true) {
            console.log("updated attachement url successfully")
        } else {
            console.log("update of attachement url failed")
        }
        
    };
}