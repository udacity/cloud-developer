import { TodosAccess } from '../helpers/todosAccess'
import { AttachmentUtils } from '../helpers/attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
import { TodoUpdate } from '../models/TodoUpdate'

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

export async function createAttachmentPresignedUrl(todoId: string, userId: string) {
    try {
        const imageId = uuid.v4();
        let url = await attachmentUtils.generateSignedUrl(imageId)
        await todoAccess.updateTodoItemAttachmentUrl(todoId, userId, imageId)
        return url
    } catch (err) {
        logger.error("Unable to update ToDo Item attachment Url", {
            methodName: 'todos.createAttachmentPresignedUrl',
            userId,
            error: err
        })
        return err
    }
}