import * as AWS from 'aws-sdk'
// import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

// const XAWS = AWSXRay.captureAWS(AWS)

import { TaskList } from '../models/TaskList'
import { UpdateTaskListRequest } from '../requests/UpdateTaskListRequest'

export default class TaskListsAccess {
  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly taskListsTable = process.env.TASK_LISTS_TABLE,
    private readonly index = process.env.TASK_LISTS_INDEX
  ) { }

  async getTaskList(userId: string, taskListId: TaskList['id']): Promise<TaskList> {
    const result = await this.docClient
      .get({
        TableName: this.taskListsTable,
        Key: {
          'userId': userId,
          'id': taskListId,
        }
      })
      .promise()

    return result.Item as TaskList
  }

  async getTaskLists(userId: string): Promise<TaskList[]> {
    const result = await this.docClient
      .query({
        TableName: this.taskListsTable,
        IndexName: this.index,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId
        }
      })
      .promise()

    const items = result.Items
    return items as TaskList[]
  }

  async createTaskList(taskList: TaskList): Promise<TaskList> {
    await this.docClient
      .put({
        TableName: this.taskListsTable,
        Item: taskList
      })
      .promise()

    return taskList
  }

  async upsertTaskList(taskList: TaskList): Promise<TaskList> {
    const result = await this.docClient
      .update({
        TableName: this.taskListsTable,
        Key: {
          userId: taskList.userId,
          id: taskList.id,
        },
        UpdateExpression: 'set userId = :userId, id = :id, title = :title',
        ConditionExpression: 'attribute_not_exists(id) OR id = :id',
        ExpressionAttributeValues: {
          ':userId': taskList.userId,
          ':id': taskList.id,
          ':title': taskList.title,
        },
        ReturnValues: 'ALL_NEW'
      })
      .promise()

    return result.Attributes as TaskList
  }

  async updateTaskList(
    userId: TaskList['userId'],
    taskListId: TaskList['id'],
    updatedTaskList: UpdateTaskListRequest
  ): Promise<TaskList> {
    const { title, syncedAt } = updatedTaskList

    const result = await this.docClient
      .update({
        TableName: this.taskListsTable,
        Key: {
          userId: userId,
          id: taskListId
        },
        UpdateExpression: `set ${title ? '#title = :title,' : ''} ${syncedAt ? '#syncedAt = :syncedAt,' : ''}`,
        ExpressionAttributeValues: {
          ':title': title,
          ':syncedAt': syncedAt,
        },
        ReturnValues: 'ALL_NEW'
      })
      .promise()

    return result.Attributes as TaskList
  }

  async deleteTaskList(userId: TaskList['userId'], taskListId: TaskList['id']): Promise<void> {
    await this.docClient
      .delete({
        TableName: this.taskListsTable,
        Key: {
          userId: userId,
          id: taskListId
        }
      })
      .promise()
  }
}

function createDynamoDBClient() {
  if (process.env.IS_OFFLINE) {
    console.log('Creating a local DynamoDB instance')
    // return new XAWS.DynamoDB.DocumentClient({
    return new AWS.DynamoDB.DocumentClient({
      region: "localhost",
      accessKeyId: "MOCK_ACCESS_KEY_ID",
      secretAccessKey: "MOCK_SECRET_ACCESS_KEY",
      endpoint: "http://dynamo:8000"
    });
    // return new AWS.DynamoDB.DocumentClient({
    //   region: 'localhost',
    //   endpoint: 'http://localhost:8000',
    //   // needed if you don't have aws credentials at all in env
    //   accessKeyId: 'DEFAULT_ACCESS_KEY',
    //   secretAccessKey: 'DEFAULT_SECRET'
    // })
  }

  // return new XAWS.DynamoDB.DocumentClient()
  return new AWS.DynamoDB.DocumentClient()
}
