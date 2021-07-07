import * as uuid from 'uuid'

import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { Todo } from '../models/TodoItem'
import { TodoAccess } from '../data-layer/todosAccess'

const todoAccess = new TodoAccess()

export async function createTodo(userId: string, todoRequest: CreateTodoRequest) : Promise<Todo> {
  const todo: Todo = {
    createdAt: new Date().toISOString(),
    done: false,
    dueDate: todoRequest.dueDate,
    name: todoRequest.name,
    todoId: uuid.v4(),
    userId
  }
  
  return await todoAccess.createTodo(todo)
}

export async function checkTodo(userId: string, createdAt: string, done: boolean) : Promise<boolean> {
  return await todoAccess.checkTodo({userId, createdAt}, done)
}

export async function updateTodoUrl(userId: string, createdAt: string, todoId: string) : Promise<boolean> {
  return await todoAccess.updateTodoUrl({userId, createdAt}, todoId)
}

export async function deleteTodo(userId: string, createdAt: string) : Promise<boolean> {
  return await todoAccess.deleteTodo({userId, createdAt})
}

export async function queryByTodoId(id: string) : Promise<any> {
  return await todoAccess.queryByTodoId(id)
}

export async function queryByUserId(id: string) : Promise<any> {
  return await todoAccess.queryByUserId(id)
}
