/**
 * Fields in a request to update a single todo item.
 */
export interface UpdateTodoRequest {
  name: string
  dueDate: string
  done: boolean
}