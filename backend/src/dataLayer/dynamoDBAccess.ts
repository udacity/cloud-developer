import * as AWS from 'aws-sdk'
// import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

// const XAWS = AWSXRay.captureAWS(AWS)

export default function createDynamoDBClient(): DocumentClient {
  // if (process.env.IS_OFFLINE) {
  //   console.log('Creating a local DynamoDB instance')
  //   return new AWS.DynamoDB.DocumentClient({
  //     region: "localhost",
  //     accessKeyId: "MOCK_ACCESS_KEY_ID",
  //     secretAccessKey: "MOCK_SECRET_ACCESS_KEY",
  //     endpoint: "http://localhost:8000"
  //   });
  // }

  // return new XAWS.DynamoDB.DocumentClient()
  return new AWS.DynamoDB.DocumentClient()
}
