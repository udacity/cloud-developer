import 'source-map-support/register'

import {getAllTodos} from '../../businessLogic/todos'

import { createLogger } from '../../utils/logger'

import * as express from 'express'
import * as awsServerlessExpress from 'aws-serverless-express'

// get express class
const app = express()

const logger = createLogger('getTodos')

//request get todos
app.get('/todos', async(_req, res) => {
  //get all todo items
  const todos = await getAllTodos()

  res.setHeader('Access-Control-Allow-Origin', '*');

  res.json({
    items: todos
  })
})

logger.info("start request get todos")

const server = awsServerlessExpress.createServer(app)

exports.handler = (event, context) => {awsServerlessExpress.proxy(server, event, context)}
