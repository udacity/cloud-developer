import * as winston from 'winston';

import GoogleTaskAccessor from '../dataLayer/googleTaskAccess';
import TaskListAccessor from '../dataLayer/taskListsAccess';
import TodoAccessor from '../dataLayer/todosAccess';
import UserAccessor from '../dataLayer/usersAccess';
import { createLogger } from '../utils/logger';

import { GoogleTaskList, TaskList } from '../models/TaskList';
import { TodoItem } from '../models/TodoItem';

/**
 * For one google account, grabs their tasklists and
 * - store the new completed tasks since their last sync
 * - update their balance
 * - set their last sync to the latest completed task or current time if no new tasks
 */
export default class TaskSynchronizer {
  googleTaskAccessor: GoogleTaskAccessor;
  taskListAccessor: TaskListAccessor;
  todoAccessor: TodoAccessor;
  userAccessor: UserAccessor;
  userId: string; // id of user whose tasks are being updated
  logger: winston.Logger;

  constructor(userId: string, googleTaskAccessToken: string) {
    if (!userId || !googleTaskAccessToken) {
      throw new Error(
        `Missing params for TaskSynchronizer, userId ${userId}, googleTaskAccessToken ${googleTaskAccessToken}`
      );
    }
    this.userId = userId;
    this.googleTaskAccessor = new GoogleTaskAccessor(googleTaskAccessToken);
    this.taskListAccessor = new TaskListAccessor();
    this.todoAccessor = new TodoAccessor();
    this.userAccessor = new UserAccessor();
    this.logger = createLogger(`taskSynchronizer-${userId}`);
  }

  async perform() {
    // TODO: how to handle errors for each step better?
    const googleTaskLists = await this.googleTaskAccessor.getTaskLists();
    const taskLists = await this.getTaskListsForGoogleTaskLists(
      googleTaskLists
    );
    const newTasksPerList = await Promise.all(
      taskLists.map(taskList => this.getNewCompletedGoogleTasks(taskList))
    );
    console.log('newTasksPerList :', newTasksPerList);
    const additionalBalance = newTasksPerList.reduce(
      (total, tasks) => total + tasks.length,
      0
    );
    const newBalance = await this.userAccessor.incrementBalance(
      this.userId,
      additionalBalance
    );
    // TODO: can also increment a newCompletedCountSinceLastLogin type feature
    return {
      balance: newBalance,
      newTasksCount: additionalBalance
    };
  }

  async getTaskListsForGoogleTaskLists(googleTaskLists: GoogleTaskList[]) {
    return Promise.all(
      googleTaskLists.map(googleTaskList =>
        this.taskListAccessor.upsertTaskList({
          userId: this.userId,
          taskListId: googleTaskList.id,
          title: googleTaskList.title
        })
      )
    );
  }

  async getNewCompletedGoogleTasks(taskList: TaskList): Promise<TodoItem[]> {
    const { syncedAt, taskListId } = taskList;
    const newGoogleTasks = await this.googleTaskAccessor.getCompletedTasks({
      completedMin: syncedAt,
      taskListId
    });
    const newTasks = newGoogleTasks.map(googleTask =>
      this.googleTaskToTodoItem(googleTask)
    );
    const newSyncedAt = this.getNewSyncedAt(newTasks);
    await Promise.all([
      this.todoAccessor.createTodos(newTasks),
      this.taskListAccessor.updateTaskList(this.userId, taskListId, {
        syncedAt: newSyncedAt
      })
    ]);
    return newTasks;
  }

  googleTaskToTodoItem(task: any): TodoItem {
    return {
      userId: this.userId,
      todoId: task.id,
      createdAt: new Date().toISOString(),
      name: task.title,
      done: task.status === 'completed',
      completedAt: task.completed
    };
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

  getNewSyncedAt(tasks: TodoItem[]) {
    // first one may not be the latest one? If there are duplicates, this might be the cause
    const completedAt = tasks.length
      ? new Date(tasks[0].completedAt)
      : new Date();
    // TODO: this will probably fuck up if at 999 milliseconds
    completedAt.setSeconds(completedAt.getSeconds() + 1);
    return completedAt.toISOString();
  }
}
