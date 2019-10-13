import 'source-map-support/register'

import {createTodo} from '../../businessLogic/todos'
import { createLogger } from '../../utils/logger'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'

import * as express from 'express'
import * as awsServerlessExpress from 'aws-serverless-express'
import { TodoItem } from '../../models/TodoItem'

// get express class
const app = express()

// import body parser
app.use(express.json())

const logger = createLogger('createTodos')

//request get todos
app.post('/todos', async(_req, res) => {
  //post all todo items
  res.setHeader('Access-Control-Allow-Origin', '*');

  const headers = _req.headers
  const authorization = headers.authorization

  const split = authorization.split(' ')
  const jwtToken = split[1]

  try{
    var newItem: CreateTodoRequest= _req.body

    const todos: TodoItem = await createTodo(newItem, jwtToken)

    res.json({
      todo: todos
    })
  }
  catch(e)
  {
    logger.error("post created fail", {error: e.message})
  }

  
})

const server = awsServerlessExpress.createServer(app)

exports.handler = (event, context) => {awsServerlessExpress.proxy(server, event, context)}
