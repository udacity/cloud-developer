import * as uuid from 'uuid'

import { TodoItem } from '../models/TodoItem'
import { TodosAccess } from '../dataLayer/todosAccess'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { parseUserId } from '../auth/utils'

const todosAccess = new TodosAccess()

export async function getAllTodos(): Promise<TodoItem[]> {
  return todosAccess.getAllTodos()
}
export async function getUserTodos(jwtToken: string): Promise<TodoItem[]> {
  const userId = parseUserId(jwtToken)
  return todosAccess.getTodos(userId)
}

export async function createTodo(
  createTodoRequest: CreateTodoRequest,
  jwtToken: string
): Promise<TodoItem> {

  const todoId = uuid.v4()
  const userId = parseUserId(jwtToken)

  return await todosAccess.createTodo({
    userId: userId,
    todoId: todoId ,
    createdAt:  new Date().toISOString(),
    name: createTodoRequest.name,
    dueDate: createTodoRequest.dueDate,
    attachmentUrl:createTodoRequest.attachmentUrl,
    done: false
  })
}

export async function updateTodo(
  todoItem:TodoItem,
  updateTodoRequest: UpdateTodoRequest
): Promise<TodoItem> {


  todoItem.name = updateTodoRequest.name
  todoItem.dueDate = updateTodoRequest.dueDate
  todoItem.done = updateTodoRequest.done
  if(updateTodoRequest !== undefined)
    todoItem.attachmentUrl = updateTodoRequest.attachmentUrl

  return await todosAccess.updateTodo(todoItem)
}

export async function getTodo(
  todoId: string,
  jwtToken: string
): Promise<TodoItem> {

  const userId = parseUserId(jwtToken)

  return await todosAccess.getTodo(todoId,userId)
}

export async function deleteTodo(
  todoItem:TodoItem
): Promise<boolean> {
  return await todosAccess.deleteTodo(todoItem)
}
