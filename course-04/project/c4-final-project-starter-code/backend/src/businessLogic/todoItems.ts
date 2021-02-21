import * as uuid from 'uuid'

import { TodoItem } from '../models/TodoItem'
import { TodoItemAccess } from '../dataLayer/todoItemAccess'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'

const todoItemAccess = new TodoItemAccess()

/**
 * business logic to create 
 */
export async function getAllTodosItems(): Promise<TodoItem[]> {
    return todoItemAccess.getAllTodosItems()
}


/**
 * business logic to create a new todo item
 * @param createTodoRequest the incoming request from http playload
 * @param jwtToken the JSON Web Token containing the username
 */
export async function createTodoItem( createTodoRequest: CreateTodoRequest, jwtToken: string): Promise<TodoItem> {
    const todoItemId = uuid.v4()
    const userId = 'DUMMY'

    jwtToken = jwtToken
    
    var newTodoItem: TodoItem = {
        dueDate: createTodoRequest.dueDate,
        name: createTodoRequest.name,
        createdAt: new Date().toISOString(),
        done: false,
        userId: userId,
        todoId: todoItemId
    } as TodoItem

    var createdTodoItem = await todoItemAccess.createTodoItem( newTodoItem )
    return createdTodoItem
}


export async function deleteTodoItem( todoItemId: string): Promise<Boolean> {
    await todoItemAccess.deleteTodoItem(todoItemId)
    return true
}

export async function getAllTodoItems(): Promise<TodoItem[]> {
    const allTodoItems = await todoItemAccess.getAllTodosItems()
    return allTodoItems
}

export async function updateTodoItem(todoId: String, todoItemUpdateRequest: UpdateTodoRequest): Promise<Boolean> {
    const wasUpdated = await todoItemAccess.updateTodoItem(
        todoId, 
        todoItemUpdateRequest.name,
        todoItemUpdateRequest.done, 
        todoItemUpdateRequest.dueDate)
    return wasUpdated
}