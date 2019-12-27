export interface TodoItem {
  userId: string
  todoId: string
  createdAt: string
  name: string
  done: boolean
  attachmentUrl?: string
  completedAt?: string
}
