import 'source-map-support/register'
import {APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler} from 'aws-lambda'
import {getUserId} from "../utils";
import {getTodos} from "../../businessLogic/todos";
import {createLogger} from "../../utils/logger";
const logger = createLogger('GetTodoLamda');

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // TODO: Get all TODO items for a current user

    logger.info('Getting Todos for user', {userId: getUserId(event)});

    const items = await getTodos(getUserId(event));

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            items
        })
    }
};
