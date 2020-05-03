import { CreateTodoRequest } from "../requests/CreateTodoRequest"
import { TodoItem } from "../models/TodoItem"
import * as uuid from 'uuid'
import { createLogger } from "../utils/logger"
import * as dao from '../dao/todoDao'
import { UpdateTodoRequest } from "../requests/UpdateTodoRequest"
import { TodoUpdate } from "../models/TodoUpdate"

const logger = createLogger('todo service')

const todoBucket = process.env.ATTACHMENT_S3_BUCKET

export async function createTodo(createTodoRequest: CreateTodoRequest, userId: string): Promise<TodoItem> {
    logger.info('in createTodo service')
  
    const todoId = uuid.v4()
  
    return await dao.createTodo({
      userId: userId,
      todoId: todoId,
      createdAt: new Date().toISOString(),
      name: createTodoRequest.name,
      dueDate: createTodoRequest.dueDate,
      done: false,
      attachmentUrl: `https://${todoBucket}.s3.amazonaws.com/${todoId}`
    })
}

export async function getAllTodos(userId: string): Promise<TodoItem[]> {
    logger.info('in getAllTodos service')
    return await dao.getAllTodos(userId)
 }

 export async function updateTodo(updateTodoRequest: UpdateTodoRequest, todoId: string, userId: string): Promise<TodoUpdate> {
    logger.info('in updateTodo service')
    return await dao.updateTodo(updateTodoRequest, todoId, userId)
  }

  export async function deleteTodo(todoId: string, userId: string): Promise<any> {
    logger.info('in deleteTodo service')
    return await dao.deleteTodo(todoId, userId)
  }