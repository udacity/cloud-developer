import * as uuid from 'uuid'
import {CreateTodoRequest} from "../requests/CreateTodoRequest";
import {TodoItem} from "../models/TodoItem";
import {TodoAccess} from "../dataLayer/todoAccess";
import {UpdateTodoRequest} from "../requests/UpdateTodoRequest";

const todoAccess = new TodoAccess();


export async function createTodo(
    createTodoRequest: CreateTodoRequest,
    userId: string
): Promise<TodoItem> {

    const itemId = uuid.v4();
    const createdDate = new Date().getDate();
    const item = {
        todoId: itemId,
        userId: userId,
        createdAt: createdDate,
        done: false,
        ...createTodoRequest
    };
    return await todoAccess.createTodo(item);
}

export async function deleteTodo(
    todoId: string,
    userId: string
): Promise<boolean> {
    return await todoAccess.deleteTodo(todoId, userId);
}

export async function updateTodoImageUrl(
    todoId: string,
    userId: string,
    imageId: string
): Promise<boolean> {

    return await todoAccess.updateTodoImageUrl(todoId, userId, imageId);

}

export async function getTodos(
    userId: string
): Promise<boolean> {

    return await todoAccess.getTodos(userId);

}

export async function updateTodo(
    updatedTodo: UpdateTodoRequest,
    todoId: string,
    userId: string
): Promise<boolean> {

    return await todoAccess.updateTodo(updatedTodo, todoId, userId);

}
