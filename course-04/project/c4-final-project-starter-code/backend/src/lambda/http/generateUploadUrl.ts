import 'source-map-support/register'
import {APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler} from 'aws-lambda'
import * as uuid from 'uuid'
import {getUserId} from "../utils";
import {getUploadUrl} from "../../dataLayer/imageStorageAccess";
import {updateTodoImageUrl} from "../../businessLogic/todos";
import {createLogger} from "../../utils/logger";

const logger = createLogger('GenerateUploadUrlLamda');

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const todoId = event.pathParameters.todoId;
    logger.info('Generating a new upload url', {id: todoId});

    const imageId = uuid.v4();

    const uploadUrl = getUploadUrl(imageId);

    await updateTodoImageUrl(todoId, getUserId(event), imageId);

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



