export interface GoogleTaskList {
  kind: string,
  id: string,
  etag: string,
  title: string,
  updated: string,
  selfLink: string
}

export interface TaskList {
  userId: string
  taskListId: string
  // undefined means never synced
  syncedAt?: string
  title: string
}
