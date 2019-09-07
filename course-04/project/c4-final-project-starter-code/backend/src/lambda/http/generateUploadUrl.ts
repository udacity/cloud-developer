import 'source-map-support/register'
import * as AWS from 'aws-sdk'
import {APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler} from 'aws-lambda'
import * as uuid from 'uuid'


const bucketName = process.env.TODO_IMAGES_S3_BUCKET;
const urlExpiration = process.env.SIGNED_URL_EXPIRATION;
const docClient = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3({
    signatureVersion: 'v4'
})
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId;
    const imageId = uuid.v4();

    const uploadUrl = getUploadUrl(imageId);

    await docClient.update({
        TableName: process.env.TodoTable,
        Key: {'todoId': todoId},
        UpdateExpression: 'set attachmentUrl = :a',
        ExpressionAttributeValues: {
            ':a': `https://${bucketName}.s3.amazonaws.com/${imageId}`,
        }
    }).promise();

    // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
    const reply = {"uploadUrl": uploadUrl};

    return {
        statusCode: 201,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify(
            reply
        )
    }
};


function getUploadUrl(imageId: string) {
    return s3.getSignedUrl('putObject', {
        Bucket: bucketName,
        Key: imageId,
        Expires: urlExpiration
    })
}
