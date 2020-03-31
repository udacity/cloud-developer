import * as uuid from 'uuid'

import { TodoItem } from '../models/TodoItem';
import { TodoAccess } from '../dataLayer/todosAccess';
import { CreateTodoRequest } from '../requests/CreateTodoRequest';
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest';

const todosAccess = new TodoAccess();

export async function getAllTodosByUserId(userId: string) : Promise<TodoItem[]> {
  return todosAccess.getAllTodosByUserId(userId);
}

export async function createTodo(todoItem: CreateTodoRequest, userId: string) : Promise<TodoItem> {
    // Note: Video Refresher about creating an item in DynamnoDB:
    // https://classroom.udacity.com/nanodegrees/nd9990/parts/a46aa194-de1d-45fd-83ef-d83080ee8f3c/modules/826241f6-8d5f-436b-b01e-4ea8885d866d/lessons/a80d1cfe-bc1d-484e-9e57-25d4fc8b3fce/concepts/af9d61b9-e22b-44c1-b867-7ee6d3f8ad9c
    const newTodoId = uuid.v4(); 
    const newTodoItem : TodoItem = {
      ...todoItem,
      todoId: newTodoId,
      userId,
      createdAt: new Date().toISOString(),
      done: false
    }
  return todosAccess.createTodo(newTodoItem);
}

export async function updateTodo(todoId: string, updateTodo: UpdateTodoRequest) : Promise<UpdateTodoRequest> {
  return todosAccess.updateTodo(todoId, updateTodo);
}

export async function deleteTodo(todoId: string) {
  return todosAccess.deleteTodo(todoId);
}

export async function checkTodoExists(todoId: string) {
  return todosAccess.checkTodoExists(todoId);
}

export async function getTodoItem(todoId: string) {
  return todosAccess.getTodoItem(todoId);
}

export async function addTodoAttachmentUrl(todoId: string) {
  const bucketName = process.env.ATTACHMENTS_IMAGES_S3_BUCKET;
  const attachmentUrl =  `https://${bucketName}.s3.amazonaws.com/${todoId}`;
  return todosAccess.addTodoAttachmentUrl(todoId, attachmentUrl);
}
