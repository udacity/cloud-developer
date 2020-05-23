import {ToDoItem} from '../dataLayer/ToDoItem'
import {TodoItem} from '../models/TodoItem'
import {decode} from 'jsonwebtoken'
import { JwtPayload } from '../auth/JwtPayload'
import {CreateTodoRequest} from '../requests/CreateTodoRequest'
import * as uuid from 'uuid'


var ToDoItemRepository = new ToDoItem()

export async function getAllToDOItems(): Promise<TodoItem[]>{
    return ToDoItemRepository.getAllToDOItems()
}

export async function postAllToDoItems(CreateTodoRequest : CreateTodoRequest , jwtToken ) : Promise <TodoItem> {
    
    var itemId = uuid.v4()
    const userIdToken = decode(jwtToken) as JwtPayload
    const userId= userIdToken.sub

    const createTodoItem : TodoItem = {
        userId: userId,
        todoId: itemId,
        createdAt:  new Date().toISOString(),
        name: CreateTodoRequest.name,
        dueDate: CreateTodoRequest.dueDate,
        done: true
        
    }
  return  ToDoItemRepository.createAllToDoItems(createTodoItem);
}