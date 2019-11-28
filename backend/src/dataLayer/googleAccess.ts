import axios from 'axios'

import { GoogleTaskList } from '../models/TaskList';

const BASE_URL = 'https://www.googleapis.com/tasks/v1/'

export default class GoogleAccess {
  accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken
  }

  getDefaultHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    }
  }

  async getTaskLists(): Promise<GoogleTaskList[]> {
    const response = await axios.get(`${BASE_URL}users/@me/lists`, {
      headers: this.getDefaultHeaders(),
    });
    return response.data.items;
  }

  async getCompletedTasks(params) {
    const { taskListId, completedMin } = params;
    const response = await axios.get(`${BASE_URL}lists/${taskListId}/tasks`, {
      headers: this.getDefaultHeaders(),
      params: {
        completedMin,
        showHidden: true
      }
    })
    const allTasks = response.data.items;
    return allTasks.filter(task => task.status === 'completed')
  }
}