import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createLogger } from '../utils/logger'
const logger = createLogger('appointmentAccess')

const XAWS = AWSXRay.captureAWS(AWS)

import { AppointmentItem } from '../models/AppointmentItem'

export class AppointmentsAccess {

  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly appointmentsTable = process.env.APPOINTMENTS_TABLE,
    private readonly indexName = process.env.INDEX_NAME) {
  }

  async getAllAppointments(): Promise<AppointmentItem[]> {
    logger.info('Getting all Appointments')

    const result = await this.docClient.scan({
      TableName: this.appointmentsTable
    }).promise()

    const items = result.Items
    return items as AppointmentItem[]
  }
  async getAppointments(userId: string): Promise<AppointmentItem[]> {
    console.log('Getting all groups')
    const result = await this.docClient
      .query({
        TableName: this.appointmentsTable,
        IndexName: this.indexName,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId
        }
      })
      .promise()

    const items = result.Items
    return items as AppointmentItem[]
  }

  async getAppointment(appointmentId: string, userId: string): Promise<AppointmentItem> {
    console.log('Getting all groups')
    const result = await this.docClient
      .query({
        TableName: this.appointmentsTable,
        IndexName: this.indexName,
        KeyConditionExpression: 'appointmentId = :appointmentId AND userId = :userId',
        ExpressionAttributeValues: {
          ':todoId': appointmentId,
          ':userId': userId
        }
      })
      .promise()

    const items = result.Items[0]
    return items as AppointmentItem
  }

  // async createTodo(todo: AppointmentItem): Promise<AppointmentItem> {
  //   await this.docClient.put({
  //     TableName: this.appointmentsTable,
  //     Item: todo
  //   }).promise()

  //   return todo
  // }

  // async deleteTodo(todoItem: AppointmentItem): Promise<boolean> {
  //   logger.info(`-----User to be deleted: ${todoItem.userId} -- todoId: ${todoItem.appointmentId}`)
  //   const result = await this.docClient.delete({
  //     TableName: this.appointmentsTable,
  //     Key: {
  //       "userId": todoItem.userId,
  //       "createdAt": todoItem.createdAt
  //     },
  //     ConditionExpression: "todoId = :todoId",
  //     ExpressionAttributeValues: {
  //       ":todoId": todoItem.appointmentId
  //     }
  //   }).promise()
  //   if (result.$response.error)
  //     throw new Error('Failed to delete item: ' + result.$response.data)

  //   return true
  // }


  // async updateTodo(todoItem:AppointmentItem): Promise<AppointmentItem> {
  //   logger.info(`-----User to be updated: ${todoItem.userId} -- todoId: ${todoItem.appointmentId}`)

  //     var expressionAttibutes = {
  //       ":todoId": todoItem.appointmentId,
  //       ":done": todoItem.done,
  //       ":name": todoItem.name,
  //       ":appointmentDate": todoItem.dueDate
  //     }
  //     var updateExpression = "set done = :done, dueDate=:dueDate, #n=:name"

  //     if(todoItem.attachmentUrl !== undefined){
        
  //       expressionAttibutes[":attachmentUrl"] = todoItem.attachmentUrl
  //       updateExpression += ', attachmentUrl = :attachmentUrl'
  //     }else{
  //       updateExpression += ' REMOVE attachmentUrl'
  //     }
      

  //   const result = await this.docClient.update({
  //     TableName: this.appointmentsTable,
  //     Key: {
  //       "userId": todoItem.userId,
  //       "createdAt": todoItem.createdAt
  //     },
  //     ConditionExpression: "todoId = :todoId",
  //     UpdateExpression: updateExpression,
  //     ExpressionAttributeValues: expressionAttibutes,
  //     ExpressionAttributeNames:{
  //       "#n": "name"
  //     },
  //     ReturnValues: "UPDATED_NEW"
  //   }).promise()
  //   if (result.$response.error)
  //     throw new Error('Failed to update item: ' + todoItem)
  //   return todoItem
  // }

}

function createDynamoDBClient() {
  if (process.env.IS_OFFLINE) {
    console.log('Creating a local DynamoDB instance')
    return new XAWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000'
    })
  }

  return new XAWS.DynamoDB.DocumentClient()
}
