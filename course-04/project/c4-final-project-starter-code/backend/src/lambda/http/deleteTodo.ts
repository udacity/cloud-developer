import 'source-map-support/register'

import {APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler} from 'aws-lambda'
import * as AWS from "aws-sdk";
import {getUserId} from "../utils";
// import {TodoItem} from "../../models/TodoItem";
const docClient = new AWS.DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId;


    await docClient.delete({
        TableName: process.env.TodoTable,
        Key: {
            'todoId': todoId,
            'userId': getUserId(event)

        }
    }).promise();
    return {
        statusCode: 201,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        },
        body: ''
    }
};

