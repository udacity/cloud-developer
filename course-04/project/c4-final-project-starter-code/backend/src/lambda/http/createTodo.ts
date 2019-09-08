import 'source-map-support/register'

import {APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult} from 'aws-lambda'
import {CreateTodoRequest} from '../../requests/CreateTodoRequest'
import {createTodo} from "../../businessLogic/todos";
import {createLogger} from "../../utils/logger";
import {getUserId} from "../utils";

const logger = createLogger('CreateTodoLamda');


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newTodo: CreateTodoRequest = JSON.parse(event.body);
    logger.info('Creating a Todo item', newTodo);
    const item = await createTodo(newTodo, getUserId(event));

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
