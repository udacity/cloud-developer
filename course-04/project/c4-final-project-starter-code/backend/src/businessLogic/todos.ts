import * as uuid from 'uuid'

import { TodoItem } from '../models/TodoItem'
import { TodoAccess } from '../dataLayer/todosAccess'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { parseUserId } from '../auth/utils'
import { createLogger } from '..//utils/logger'
import { TodoUpdate } from '../models/TodoUpdate'


const logger = createLogger('todos')
const todoAccess = new TodoAccess()

const bucketName = process.env.TODOS_IMAGES_S3_BUCKET

export async function getAllTodos(): Promise<TodoItem[]> {
    try{
        logger.info('[todos] start getAllTodos')
        return todoAccess.getAllTodos()
    }
    catch(e){
        console.log(e.message);
    }
    
}

export async function createTodo(
  createGroupRequest: CreateTodoRequest,
  jwtToken: string
): Promise<TodoItem> {

  const todoId = uuid.v4()
  const userId = parseUserId(jwtToken)

  const attachurl = `https://${bucketName}.s3.amazonaws.com/${todoId}`

  return await todoAccess.createTodo({
    todoId: todoId,
    userId: userId,
    name: createGroupRequest.name,
    dueDate: createGroupRequest.dueDate,
    done: false,
    attachmentUrl: attachurl,
    createdAt: new Date().toISOString()
  })
}

export async function updateTodo(
  userId: string,
  todoId: string,
  updateTodoRequest: UpdateTodoRequest
): Promise<TodoUpdate> {

  return await todoAccess.updateTodo(userId, todoId, {
    name: updateTodoRequest.name,
    dueDate: updateTodoRequest.dueDate,
    done: updateTodoRequest.done
  })
}

export async function deleteTodo(
  userId: string,
  todoId: string ){

  return await todoAccess.deleteTodo(userId, todoId)
}

export function getUploadUrl(todoId:string){
  return todoAccess.getUploadUrl(todoId)
}

