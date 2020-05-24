import {ToDoItem} from '../dataLayer/ToDoItem'
import {TodoItem} from '../models/TodoItem'
import {TodoUpdate} from '../models/TodoUpdate'
//import {decode} from 'jsonwebtoken'
//import { JwtPayload } from '../auth/JwtPayload'
import {CreateTodoRequest} from '../requests/CreateTodoRequest'
import * as uuid from 'uuid'


var ToDoItemRepository = new ToDoItem()

export async function getAllToDOItems(): Promise<TodoItem[]>{
    return ToDoItemRepository.getAllToDOItems()
}

export async function postAllToDoItems(CreateTodoRequest : CreateTodoRequest  ) : Promise <TodoItem> {
    
    var itemId = uuid.v4()
    //const userIdToken = decode(jwtToken) as JwtPayload
    //const userId= userIdToken.sub

    const createTodoItem : TodoItem = {
        userId: uuid.v4(),
        todoId: itemId,
        createdAt:  new Date().toISOString(),
        name: CreateTodoRequest.name,
        dueDate: CreateTodoRequest.dueDate,
        done: true
        
    }
  return  ToDoItemRepository.createAllToDoItems(createTodoItem);
}

export async function updateAllToDoItems(TodoUpdate : TodoUpdate, key : string) : Promise <TodoUpdate> {
    return await ToDoItemRepository.updateToDoItem(TodoUpdate , key)
    
}

export async function deleteAllToDoItems(key:string) {
    await ToDoItemRepository.deleteToDoItem(key)
}