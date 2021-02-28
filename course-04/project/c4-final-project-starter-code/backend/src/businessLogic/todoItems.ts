import * as uuid from 'uuid'

import { TodoItem } from '../models/TodoItem'
import { TodoItemAccess } from '../dataLayer/todoItemAccess'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'

const todoItemAccess = new TodoItemAccess()

/**
 * business logic to create 
 */
export async function getAllTodosItems(userId: String): Promise<TodoItem[]> {
    return todoItemAccess.getAllTodosItems(userId)
}


/**
 * business logic to create a new todo item
 * @param createTodoRequest the incoming request from http playload
 * @param jwtToken the JSON Web Token containing the username
 */
export async function createTodoItem( createTodoRequest: CreateTodoRequest, username: string): Promise<TodoItem> {
    const todoItemId = uuid.v4()

    var newTodoItem: TodoItem = {
        dueDate: createTodoRequest.dueDate,
        name: createTodoRequest.name,
        createdAt: new Date().toISOString(),
        done: false,
        userId: username,
        todoId: todoItemId
    } as TodoItem

    var createdTodoItem = await todoItemAccess.createTodoItem( newTodoItem )
    return createdTodoItem
}


export async function deleteTodoItem( todoItemId: string, userId: String): Promise<Boolean> {
    await todoItemAccess.deleteTodoItem(todoItemId, userId)
    return true
}

export async function getAllTodoItems(userId: String): Promise<TodoItem[]> {
    const allTodoItems = await todoItemAccess.getAllTodosItems(userId)
    return allTodoItems
}

export async function updateTodoItem(todoId: String, userId: String, todoItemUpdateRequest: UpdateTodoRequest): Promise<Boolean> {
    const wasUpdated = await todoItemAccess.updateTodoItem(
        todoId, 
        todoItemUpdateRequest.name,
        todoItemUpdateRequest.done, 
        todoItemUpdateRequest.dueDate,
        userId)
    return wasUpdated
}


export async function updateAttachmentURL(todoId: String, userId: String, url: String): Promise<Boolean> {
    const operationSuccessful = await todoItemAccess.updateAttachmentURL(todoId, userId, url)
    return operationSuccessful
}