import { TodosAccess } from '../helpers/todosAccess'
import { AttachmentUtils } from '../helpers/attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
// import * as createError from 'http-errors'
import { TodoUpdate } from '../models/TodoUpdate'

// TODO: Implement businessLogic
const todoAccess: TodosAccess = new TodosAccess()
const attachmentUtils = new AttachmentUtils()
const logger = createLogger('businessLayerLogger')
export async function getTodosForUser(userId: string) {
    try {
        let todos = await todoAccess.getTodoList(userId)
        return todos
    } catch (err) {
        logger.error("Unable to get list of ToDos", {
            userId,
            error: err
        })
        return err
    }
}


export async function createTodo(todoRequest: CreateTodoRequest, userId: string) {

    const todoId = uuid.v4()
    // Build ToDoItem
    const todoItem : TodoItem = 
    {
      userId: userId,
      todoId: todoId,
      createdAt: new Date().toLocaleString(),
      name: todoRequest.name,
      dueDate: todoRequest.dueDate,
      done: false,
      attachmentUrl: todoRequest.attachmentUrl
    }

    try {
        await todoAccess.insertTodoItem(todoItem)
        return todoItem
    } catch (err) {
        logger.error("Unable to save ToDo Item", {
            methodName: 'todos.intertTodoItem',
            userId,
            error: err
        })
        return err
    }

}

export async function updateTodo(todoId: string,userId: string, updatedTodoItem: UpdateTodoRequest) {
    // Map UpdateTodoRequest to TodoUpdate
    const todoUpdate: TodoUpdate = {
        ...updatedTodoItem
    }
    
    try {
        await todoAccess.updateTodoItem(todoId, userId, todoUpdate)
    } catch (err) {
        return err
    }
}

export async function deleteTodo(todoId: string, userId: string) {
    
    try {
        await todoAccess.deleteTodoItem(todoId, userId)
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