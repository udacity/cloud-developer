import * as uuid from 'uuid'
import TodosAccess from "../dataLayer/todosAccess"
import { TodoItem } from "../models/TodoItem"
import { CreateTodoRequest } from "../requests/CreateTodoRequest"
import { TodoUpdate } from '../models/TodoUpdate'
import { getAttachmentUrl } from './attachmentUrl'


const todosAccess = new TodosAccess()

export async function getTodos(userId: string): Promise<TodoItem[]> {
    const result = await todosAccess.getTodos(userId)

    return result
}
