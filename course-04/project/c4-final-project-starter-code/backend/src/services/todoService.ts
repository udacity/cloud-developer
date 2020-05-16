import {TodoRepository} from "../repositories/todoRepository";
import {CreateTodoRequest} from "../requests/CreateTodoRequest";
import {TodoItem} from "../models/TodoItem";
import {UpdateTodoRequest} from "../requests/UpdateTodoRequest";
import {TodoUpdate} from "../models/TodoUpdate";
import * as uuid from 'uuid'
import {getDownloadUrl} from "./imageService";

const todoRepository = new TodoRepository();

export async function getTodos(userId: string): Promise<TodoItem[]> {
    const todoItems = await todoRepository.getTodos(userId);

    for (const todoItem of todoItems) {
        delete todoItem.userId

        if (todoItem.hasUpload === true)
            todoItem.attachmentUrl = getDownloadUrl(todoItem.todoId, userId)
    }

    return todoItems;
}

export async function createTodo(createTodoRequest: CreateTodoRequest, userId: string): Promise<TodoItem> {
    const itemId = uuid.v4()

    return await todoRepository.createTodo({
        todoId: itemId,
        userId: userId,
        name: createTodoRequest.name,
        dueDate: createTodoRequest.dueDate,
        done: false,
        attachmentUrl: null,
        createdAt: new Date().toISOString(),
        hasUpload: false
    })
}

export async function updateTodo(todoId: string, userId: string, updateTodoRequest: UpdateTodoRequest): Promise<TodoUpdate> {
    return await todoRepository.updateTodo(todoId, userId, {
        name: updateTodoRequest.name,
        dueDate: updateTodoRequest.dueDate,
        done: updateTodoRequest.done
    })
}

export async function deleteTodo(todoId: string, userId: string): Promise<void> {
    await todoRepository.deleteTodo(todoId, userId);
}

export async function getTodo(todoId: string): Promise<TodoItem> {
    return await todoRepository.getTodo(todoId);
}

export async function updateImageUploaded(todoId: string, userId: string): Promise<void> {
    await todoRepository.updateHasUpload(todoId, userId);
}
