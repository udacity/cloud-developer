import 'source-map-support/register'

import {APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult} from 'aws-lambda'

import {UpdateTodoRequest} from '../../requests/UpdateTodoRequest'
import * as AWS from "aws-sdk";
import {getUserId} from "../utils";

const docClient = new AWS.DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId;
    const updatedTodo: UpdateTodoRequest = JSON.parse(event.body);

    await docClient.update({
        TableName: process.env.TodoTable,
        Key: {
            'todoId': todoId,
            'userId': getUserId(event),
        },
        UpdateExpression: 'set #name = :n, dueDate = :dd, done = :d ',
        ExpressionAttributeValues: {
            ':n': updatedTodo.name,
            ':dd': updatedTodo.dueDate,
            ':d': updatedTodo.done
        },
        ExpressionAttributeNames: {
            "#name": "name"
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
