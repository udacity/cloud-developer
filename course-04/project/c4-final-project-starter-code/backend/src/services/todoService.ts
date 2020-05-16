import {TodoRepository} from "../repositories/todoRepository";
import {CreateTodoRequest} from "../requests/CreateTodoRequest";
import {TodoItem} from "../models/TodoItem";
import {UpdateTodoRequest} from "../requests/UpdateTodoRequest";
import {TodoUpdate} from "../models/TodoUpdate";
import * as uuid from 'uuid'

const todoRepository = new TodoRepository();

export async function getTodos(userId: string): Promise<TodoItem[]> {
    return await todoRepository.getTodos(userId);
}
export async function createTodo(createTodoRequest: CreateTodoRequest, userId: string) : Promise<TodoItem> {
    const itemId = uuid.v4()

    return await todoRepository.createTodo({
        todoId: itemId,
        userId: userId,
        name: createTodoRequest.name,
        dueDate: createTodoRequest.dueDate,
        done: false,
        attachmentUrl: null,
        createdAt: new Date().toISOString()
    })
}

export async function updateTodo(todoId: string, userId: string, updateTodoRequest: UpdateTodoRequest) : Promise<TodoUpdate> {
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

export async function updateAttachmentUrl(todoId: string, userId: string, attachmentUrl: string) : Promise<void> {
    await todoRepository.updateAttachmentUrl(todoId, userId, attachmentUrl);
}
