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

  // recursively call with the nextPageToken until !response.data.items
  async getCompletedTasks(params) {
    console.log(JSON.stringify(params));
    const { taskListId, completedMin, pageToken } = params;
    const response = await axios.get(`${BASE_URL}lists/${taskListId}/tasks`, {
      headers: this.getDefaultHeaders(),
      params: omitUndefined({
        pageToken,
        completedMin,
        showHidden: true,
        showCompleted: true,
        maxResults: 100
      })
    })

    const { items } = response.data;
    const { nextPageToken } = response.data;
    if (nextPageToken) {
      // TOOD: hmm this could stack overflow technically
      const nextPageResults = await this.getCompletedTasks({ ...params, pageToken: nextPageToken })
      return this.filterCompleted(items).concat(nextPageResults)
    }
    return this.filterCompleted(items) || [];
  }

  filterCompleted(tasks) {
    return tasks.filter(task => task.status === 'completed')
  }
}

function omitUndefined(obj) {
  Object.keys(obj).forEach(key => obj[key] === undefined ? delete obj[key] : '');
  return obj
}