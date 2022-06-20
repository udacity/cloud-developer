import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'
import { generateAttachmentUrl, updateAttachmentUrl } from '../../businessLogic/todos'
import { getUserId } from '../utils'
import * as uuid from 'uuid'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const attachmentId = uuid.v4()
    const uploadUrl = await generateAttachmentUrl(attachmentId)

    await updateAttachmentUrl(getUserId(event), event.pathParameters.todoId, attachmentId)

    return {
      statusCode: 200,
      body: JSON.stringify({
        uploadUrl
      })
    }
  }
)

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
