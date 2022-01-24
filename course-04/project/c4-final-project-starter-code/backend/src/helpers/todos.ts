import { TodosAccess } from './todosAcess'
import { AttachmentUtils } from './attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
//import * as createError from 'http-errors'

// TODO: Implement businessLogic
const todoAccess: TodosAccess = new TodosAccess()
const attachmentUtils: AttachmentUtils = new AttachmentUtils()
const logger = createLogger("Todos")

export async function createTodo(newTodoReq: CreateTodoRequest, userId: string): Promise<TodoItem> {
    logger.info("Creating todo for user ", userId)
    const createdAt: string = new Date().toISOString()
    const todoId: string = uuid.v4().toString()
    return await todoAccess.createTodo({
        todoId: todoId,
        userId: userId,
        name: newTodoReq.name,
        createdAt: createdAt,
        dueDate: newTodoReq.dueDate,
        done: false,
        attachmentUrl: '',
    })
}

export async function getTodosForUser(userId: string): Promise<TodoItem[]> {
    logger.info("Getting todos for user ", userId)
    return await todoAccess.getTodos(userId)
}

export async function deleteTodo(userId: string, todoId: string) {
    logger.info("Deleting todo for user ", userId)
    return await todoAccess.deleteTodo(userId, todoId)
}

export async function updateTodo(userId: string, todoId: string, updatedTodo: UpdateTodoRequest) {
    logger.info("Updating todo for user ", userId)
    await todoAccess.updateTodo({
        name: updatedTodo.name,
        dueDate: updatedTodo.dueDate,
        done: updatedTodo.done
    }, userId, todoId)
}

export async function createAttachmentPresignedUrl(userId: string, todoId: string): Promise<string> {
    logger.info("Creating URL and attaching for item ", todoId)
    const imageId: string = uuid.v4().toString()
    const url: string = await attachmentUtils.getUploadUrl(imageId)
    const todo: TodoItem = await todoAccess.getTodo(userId, todoId)
    await todoAccess.attachUrl(imageId, todo)
    return url
}
