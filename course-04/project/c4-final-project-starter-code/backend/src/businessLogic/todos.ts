import { TodosAccess } from '../helpers/todosAccess'
import { AttachmentUtils } from '../helpers/attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
import * as createError from 'http-errors'
import { TodoUpdate } from '../models/TodoUpdate'

// TODO: Implement businessLogic
const todoAccess: TodosAccess = new TodosAccess('ToDoTable')
const attachmentUtils = new AttachmentUtils()
export const getTodosForUser = (userId: string) => {
    try {
        return todoAccess.getTodoList(userId)
    } catch (err) {
        return err
    }
}


export const createTodo = (todoRequest: CreateTodoRequest, userId: string) => {

    const todoId = uuid.v4
    // Build ToDoItem
    const todoItem : TodoItem = 
    {
      userId: userId,
      todoId: todoId,
      createdAt: new Date().toLocaleString(),
      name: todoRequest.name,
      dueDate: todoRequest.dueDate,
      done: false,
      attachmentUrl: `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${todoId}`
    }

    try {
        todoAccess.insertTodoItem(todoItem)
        return todoItem
    } catch (err) {
        return err
    }

}

export const updateTodo = (todoId: string, updatedTodoItem: UpdateTodoRequest) => {
    // Map UpdateTodoRequest to TodoUpdate
    const todoUpdate: TodoUpdate = {
        ...updatedTodoItem
    }
    
    try {
        todoAccess.updateTodoItem(todoId, todoUpdate)
    } catch (err) {
        return err
    }
}

export const deleteTodo = (todoId: string) => {
    
    try {
        todoAccess.deleteTodoItem(todoId)
    } catch (err) {
        return err
    }
}

export const createAttachmentPresignedUrl = (todoId: string) => {
    try {
        return attachmentUtils.generateSignedUrl(todoId)
    } catch (err) {
        err
    }
}