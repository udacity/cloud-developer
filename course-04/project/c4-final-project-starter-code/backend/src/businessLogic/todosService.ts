import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate'
import { TodosAccess } from '../dataLayer/todosAccess'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import * as uuid from 'uuid'

const todosAccess = new TodosAccess()
const todoBucketName = process.env.S3_BUCKET

export async function getAllTodoItems(userId: string): Promise<TodoItem[]> {
    return todosAccess.getAllTodos(userId)
}

export async function getTodoItem(userId: string, todoId: string): Promise<TodoItem> {
    return todosAccess.getTodoItem(userId, todoId)
}

export async function createTodoItem(userId: string, request: CreateTodoRequest): Promise<TodoItem> {
    const todoId = uuid.v4()
    const createdAt = new Date().toISOString()
    const attachmentUrl = `https://${todoBucketName}.s3.amazonaws.com/${todoId}`

    const newItem: TodoItem = {
        userId,
        todoId,
        createdAt,
        name: request.name,
        dueDate: request.dueDate,
        done: false,
        attachmentUrl
    }
    return todosAccess.createTodo(newItem)
}

export async function updateTodoItem(userId: string, todoId: string, request: UpdateTodoRequest): Promise<TodoUpdate> {
    return todosAccess.updateTodo(userId, todoId, request)
}

export async function deleteTodoItem(userId: string, todoId: string) {
    todosAccess.deleteTodoItem(userId, todoId)
}

export function getAttachementUploadUrl(todoId: string) {
    return todosAccess.getUploadUrl(todoId)
}