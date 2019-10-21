import { TodoItem } from '../models/TodoItem'
import { TodosAccess } from '../dataLayer/todosAccess'
import { parseUserId } from '../auth/utils'

const todosAccess = new TodosAccess()

export async function getAllGroups(jwtToken: string): Promise<TodoItem[]> {
    const userId = parseUserId(jwtToken)
    return todosAccess.getAllTodos(userId)
}