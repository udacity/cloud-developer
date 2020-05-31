import {ToDoItem} from '../dataLayer/ToDoItem'
import {TodoItem} from '../models/TodoItem'
import {TodoUpdate} from '../models/TodoUpdate'
//import {decode} from 'jsonwebtoken'
//import { JwtPayload } from '../auth/JwtPayload'
import {CreateTodoRequest} from '../requests/CreateTodoRequest'
import * as uuid from 'uuid'
import { createLogger } from '../utils/logger'

const logger = createLogger('getToDO')

var bucket_name = process.env.AttachmentBucket

var ToDoItemRepository = new ToDoItem()

export async function getAllToDOItems(userId: string): Promise<TodoItem[]>{
    logger.info('get to do items in business layer')
    return ToDoItemRepository.getAllToDOItems(userId)
}

export async function postAllToDoItems(CreateTodoRequest : CreateTodoRequest, userid: string  ) : Promise <TodoItem> {
    logger.info('add to do item in business layer')
    var itemId = uuid.v4()
    //const userIdToken = decode(jwtToken) as JwtPayload
    //const userId= userIdToken.sub

    const createTodoItem : TodoItem = {
        userId: userid,
        todoId: itemId,
        createdAt:  new Date().toISOString(),
        name: CreateTodoRequest.name,
        dueDate: CreateTodoRequest.dueDate,
        done: true,
        attachmentUrl: `https://${bucket_name}.s3.amazonaws.com/${itemId}`
        
    }
  return  ToDoItemRepository.createAllToDoItems(createTodoItem);
}

export async function updateAllToDoItems(TodoUpdate : TodoUpdate, key : string) : Promise <TodoUpdate> {
    logger.info('update to do item in business layer')
    return await ToDoItemRepository.updateToDoItem(TodoUpdate , key)
    
}

export async function deleteAllToDoItems(key:string) {
    logger.info('delete to do item in business layer')
    await ToDoItemRepository.deleteToDoItem(key)
}