import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as AWS  from 'aws-sdk'
import * as uuid from 'uuid'
import { strict } from 'assert'

const docClient = new AWS.DynamoDB.DocumentClient()

const s3 = new AWS.S3({
  signatureVersion: 'v4'
})

const groupsTable = process.env.GROUPS_TABLE
const imagesTable = process.env.IMAGES_TABLE
const bucketName = process.env.IMAGES_S3_BUCKET
const urlExpiration = +process.env.SIGNED_URL_EXPIRATION

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Caller event', event)
  const groupId = event.pathParameters.groupId
  const validGroupId = await groupExists(groupId)

  if (!validGroupId) {
    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: 'Group does not exist'
      })
    }
  }
  console.log("Valid group")

  // TODO: Create an image

  const imageId = uuid.v4();
  const parsedBody = JSON.parse(event.body)
  const timestamp =  new Date().toISOString();
  const newImage = {
    groupId: groupId,
    imageId:imageId,
    timestamp:timestamp,
    ...parsedBody,
    imageUrl:`https://${ bucketName }.s3.amazonaws.com/${imageId}`
  }

  console.log("New image: ",newImage);

  await docClient.put({
    TableName: imagesTable,
    Item: newImage
  }).promise() 

  const url = getUploadUrl(imageId)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      newItem: newImage,
      uploadUrl:url
    }
      )
  }
}

async function groupExists(groupId: string) {
  const result = await docClient
    .get({
      TableName: groupsTable,
      Key: {
        id: groupId
      }
    })
    .promise()

  console.log('Get group: ', result)
  return !!result.Item
}

function getUploadUrl(imageId:string){
  return s3.getSignedUrl('putObject',{
    Bucket: bucketName,
    Key:imageId,
    Expires: urlExpiration
  })
}