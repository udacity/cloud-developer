import * as winston from 'winston'

import GoogleAccessor from '../dataLayer/googleAccess'
import TaskListAccessor from '../dataLayer/taskListsAccess'
import TodoAccessor from '../dataLayer/todosAccess'
import UserAccessor from '../dataLayer/usersAccess'
import { createLogger } from '../utils/logger'

import { GoogleTaskList, TaskList } from '../models/TaskList'
import { TodoItem } from '../models/TodoItem';

export default class TaskSynchronizer {
  googleAccessor: GoogleAccessor
  taskListAccessor: TaskListAccessor
  todoAccessor: TodoAccessor
  userAccessor: UserAccessor
  userId: string; // id of user whose tasks are being updated
  logger: winston.Logger

  constructor(userId: string, googleAccessToken: string) {
    if (!userId || !googleAccessToken) {
      throw new Error(`Missing params for TaskSynchronizer, userId ${userId}, googleAccessToken ${googleAccessToken}`)
    }
    this.userId = userId;
    this.googleAccessor = new GoogleAccessor(googleAccessToken);
    this.taskListAccessor = new TaskListAccessor()
    this.todoAccessor = new TodoAccessor()
    this.userAccessor = new UserAccessor()
    this.logger = createLogger(`taskSynchronizer-${userId}`)
  }

  async perform() {
    // TODO: how to handle errors for each step better?
    try {
      const googleTaskLists = await this.googleAccessor.getTaskLists();
      const taskLists = await this.getTaskListsForGoogleTaskLists(googleTaskLists);
      console.log('\n\n taskLists', taskLists, '\n\n');
      await Promise.all(taskLists.map(({ taskListId, syncedAt }) => this.syncCompletedTasksForTaskList(taskListId, syncedAt)))
    } catch (err) {
      this.logger.error(`Failed to sync completed tasks for user ${this.userId}`, err)
    }
  }

  async getTaskListsForGoogleTaskLists(googleTaskLists: GoogleTaskList[]) {
    return Promise.all(googleTaskLists.map(googleTaskList =>
      this.taskListAccessor.upsertTaskList({
        userId: this.userId,
        taskListId: googleTaskList.id,
        title: googleTaskList.title
      })
    ))
  }

  async syncCompletedTasksForTaskList(taskListId: TaskList['taskListId'], syncedAt: TaskList['syncedAt']) {
    console.log('getting newly completed tasks syncedAt, taskListId', syncedAt, taskListId);
    const newGoogleTasks = await this.googleAccessor.getCompletedTasks({
      completedMin: syncedAt,
      taskListId
    })
    console.log('newGoogleTasks :', newGoogleTasks.length, newGoogleTasks);
    const newTasks = newGoogleTasks.map(this.googleTaskToTodoItem)
    await Promise.all([
      this.todoAccessor.createTodos(newTasks),
      this.userAccessor.incrementBalance(this.userId, newTasks.length)
    ])
    await this.taskListAccessor.updateTaskList(this.userId, taskListId, {
      // TODO: this might be incorrect sometimes? If there are duplicates, this might be the cause
      syncedAt: newTasks[0].completed
    })
    // TODO: can also increment a newCompletedCountSinceLastLogin type feature
  }

  googleTaskToTodoItem(task: any): TodoItem {
    return {
      userId: this.userId,
      todoId: task.id,
      createdAt: new Date().toString(),
      name: task.title,
      dueDate: task.due,
      done: task.status === 'completed',
      completedAt: task.completed
    }
    // "kind": "tasks#task",
    // "id": "Sk9pUms0dGtPRkJKclRyRQ",
    // "etag": "\"LTEzMjc1MTIxMTg\"",
    // "title": "Create DynamoDB table",
    // "updated": "2019-11-28T07:18:05.000Z",
    // "selfLink": "https://www.googleapis.com/tasks/v1/lists/MTU2OTY5MzAxMTUwNDQ3NTUyNjg6MDow/tasks/Sk9pUms0dGtPRkJKclRyRQ",
    // "position": "09999998425074514793",
    // "status": "completed",
    // "due": "2019-11-27T00:00:00.000Z",
    // "completed": "2019-11-28T07:18:05.000Z",
    // "hidden": true
  }
}

