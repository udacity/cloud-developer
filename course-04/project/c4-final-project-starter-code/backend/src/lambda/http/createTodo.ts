import 'source-map-support/register'

import {APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult} from 'aws-lambda'
import * as uuid from 'uuid'
import {getUserId} from '../utils'
import {CreateTodoRequest} from '../../requests/CreateTodoRequest'
import * as AWS from "aws-sdk";
const docClient = new AWS.DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newTodo: CreateTodoRequest = JSON.parse(event.body);
    const itemId = uuid.v4();

    const createdDate = new Date().getDate();
    const item = {
        todoId: itemId,
        userId: getUserId(event),
        createdAt: createdDate,
        done: false,
        ...newTodo
    };
    await docClient.put({
        TableName: process.env.TodoTable,
        Item: item
    }).promise();
    // TODO: Implement creating a new TODO item
    return {
        statusCode: 201,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({
            item: item
        })
    }};
