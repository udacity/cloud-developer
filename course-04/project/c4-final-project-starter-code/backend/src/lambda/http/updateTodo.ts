import 'source-map-support/register'

//import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import * as AWS from 'aws-sdk'

import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'

import {updateTodo} from '../../businessLogic/todos'
import { createLogger } from '../../utils/logger'
import { parseUserId } from '../../auth/utils'

import * as express from 'express'
import * as awsServerlessExpress from 'aws-serverless-express'

// get express class
const app = express()

// import body parser
app.use(express.json())

const docClient = new AWS.DynamoDB.DocumentClient()

const logger = createLogger('updateTodo')

const todosTable = process.env.TODOS_TABLE

//request get todos
app.put('/todos/:todoId', async(_req, res) => {
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
    const validItem =  await todoExists(userId, todoID)

    if(!validItem)
        throw new Error('todo item not exists')

    var newItem: UpdateTodoRequest= _req.body

    const todos = await updateTodo(userId, todoID, newItem)

    res.json({
      items: todos
    })
  }
  catch(e)
  {
    logger.error("post created fail", {error: e.message})
  }

  
})

const server = awsServerlessExpress.createServer(app)

exports.handler = (event, context) => {awsServerlessExpress.proxy(server, event, context)}

async function todoExists(userId:string, todoID:string)
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

    return !!result.Item
}