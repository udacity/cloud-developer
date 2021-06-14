import * as uuid from 'uuid'

import { TodoItem } from '../../models/TodoItem'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { TodoAccess } from '../dataLayer/TodoAccess'
import { ImagesS3 } from '../dataLayer/ImagesS3'
import { createLogger } from '../../utils/logger'
const logger = createLogger('businessLogic')

const todoAccess = new TodoAccess()
const imagesS3 = new ImagesS3()

export async function createTodo(
  createTodoRequest: CreateTodoRequest,
  userId: string
): Promise<TodoItem> {
  logger.info('createTodo', {createTodoRequest, userId})
  const todoId = uuid.v4()
  const { name, dueDate } = createTodoRequest
  const createdAt = new Date().toISOString()

  return await todoAccess.createTodo({
    userId,
    todoId,
    createdAt,
    name,
    dueDate,
    done: false
  })
}

export async function updateTodo(
  todoUpdate: UpdateTodoRequest,
  userId: string,
  todoId: string
): Promise<{}> {
  logger.info('updateTodo', {todoUpdate, userId, todoId})
  const todoUpdated = await todoAccess.updateTodo(todoUpdate, userId, todoId)
  return todoUpdated
}

export async function getTodos(user: string): Promise<TodoItem[]> {
  logger.info('GetTodos ', {user})
  return await todoAccess.getAllTodo(user)
}

export async function deleteTodo(userId: string, todoId: string) {
  logger.info('deleteTodo ', {userId, todoId})
  const todoToDelete = {
    userId,
    todoId,
    createdAt: '',
    name: '',
    dueDate: '',
    done: false,
    attachmentUrl: ''
  }
  return await todoAccess.deleteTodo(todoToDelete)
}

export async function generateUrl(todoId: string): Promise<string> {
  logger.info('generate URL ', {todoId})
  const urlExpires = process.env.URL_EXPIRES

  const urlSigned = imagesS3.generateUploadURL(todoId, urlExpires)
  return urlSigned
}