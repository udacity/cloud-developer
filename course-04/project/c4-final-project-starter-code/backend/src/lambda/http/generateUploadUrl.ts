import 'source-map-support/register'

//import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import * as AWS from 'aws-sdk'

import {getUploadUrl} from '../../businessLogic/todos'
import { createLogger } from '../../utils/logger'
import { parseUserId } from '../../auth/utils'

import * as express from 'express'
import * as awsServerlessExpress from 'aws-serverless-express'
import { TodoItem } from '../../models/TodoItem'

// get express class
const app = express()

// import body parser
app.use(express.json())

const docClient = new AWS.DynamoDB.DocumentClient()

const logger = createLogger('deleteTodo')

const todosTable = process.env.TODOS_TABLE

//request get todos
app.post('/todos/:todoId/attachment', async(_req, res) => {
  //post all todo items
  res.setHeader('Access-Control-Allow-Origin', '*');

  const todoID = _req.params.todoId

  const headers = _req.headers
  const authorization = headers.authorization

  const split = authorization.split(' ')
  const jwtToken = split[1]
 
  const userId = parseUserId(jwtToken)
  
  try{
    //Check is item exists
    const validItem =  await todoExists(userId, todoID) as TodoItem

    if(!validItem)
        throw new Error('todo item not exists')

    const url = getUploadUrl(validItem.attachmentUrl)

    res.json({
      uploadUrl: url
    })
  }
  catch(e)
  {
    logger.error("post created fail", {error: e.message})
  }

  
})

const server = awsServerlessExpress.createServer(app)

exports.handler = (event, context) => {awsServerlessExpress.proxy(server, event, context)}

async function todoExists(userId:string, todoID:string): Promise<TodoItem>
{
    const result = await docClient
    .get({
        TableName: todosTable,
        Key: {
        userId: userId,
        todoId: todoID
        }
    })
    .promise()

    return result.Item as TodoItem
}

// import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

// export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
//   const todoId = event.pathParameters.todoId

//   // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
//   return undefined
// }
