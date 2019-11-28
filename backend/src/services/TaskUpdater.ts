import * as winston from 'winston'

import Google from '../dataLayer/googleAccess'
import TaskLists from '../dataLayer/taskListsAccess'
import { createLogger } from '../utils/logger'

import { GoogleTaskList, TaskList } from '../models/TaskList'

export default class TaskUpdater {
  googleAccessor: Google
  taskListsAccessor: TaskLists
  userId: string; // id of user whose tasks are being updated
  logger: winston.Logger

  constructor(userId: string, googleAccessToken: string) {
    if (!userId || !googleAccessToken) {
      throw new Error(`Missing params for TaskUpdater, userId ${userId}, googleAccessToken ${googleAccessToken}`)
    }
    this.userId = userId;
    this.googleAccessor = new Google(googleAccessToken);
    this.taskListsAccessor = new TaskLists()
    this.logger = createLogger(`taskUpdater-${userId}`)
  }

  async perform() {
    const googleTaskLists = await this.getGoogleTaskLists();
    console.log('googleTaskLists :', googleTaskLists);
    const taskLists = await this.getTaskListsForGoogleTaskLists(googleTaskLists);
    console.log('taskLists :', taskLists);

    try {
      await Promise.all(taskLists.map(this.syncCompletedTasksForTaskList))
    } catch (err) {
      this.logger.error(`Failed to sync completed tasks for user ${this.userId}`, err)
    }
  }

  async getGoogleTaskLists() {
    return this.googleAccessor.getTaskLists()
  }

  async getTaskListsForGoogleTaskLists(googleTaskLists: GoogleTaskList[]) {
    return Promise.all(googleTaskLists.map(googleTaskList =>
      this.taskListsAccessor.upsertTaskList({
        userId: this.userId,
        id: googleTaskList.id,
        title: googleTaskList.title
      })
    ))
  }

  async syncCompletedTasksForTaskList(taskList: TaskList) {
    const { id, syncedAt } = taskList;
    // grab # completed tasks since last sync time
    const tasks = await this.googleAccessor.getCompletedTasks({
      completedMin: syncedAt,
      taskListId: id
    })
    console.log('tasks.length :', tasks.length);
    console.log('tasks :', tasks);
    // sum up across all the lists
    // add sum to user's target
  }
}

