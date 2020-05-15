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
    private readonly indexName = process.env.INDEX_NAME, 
    private readonly dateIndexName = process.env.DATE_INDEX_NAME){
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
    logger.info('Getting all user appointments')
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

  async getAppointmentsInDay(userId: string,appointmentDate:string): Promise<AppointmentItem[]> {
    logger.info('GEtting appontments ind Day')
    const result = await this.docClient
      .query({
        TableName: this.appointmentsTable,
        IndexName: this.dateIndexName,
        KeyConditionExpression: 'appointmentDate = :appointmentDate AND userId = :userId',
        ExpressionAttributeValues: {
          ':appointmentDate': appointmentDate,
          ':userId': userId
        }
      })
      .promise()

    const items = result.Items
    return items as AppointmentItem[]
  }


  async getAppointment(appointmentId: string, userId: string): Promise<AppointmentItem> {
    logger.info('GEtting single Appointment')
    const result = await this.docClient
      .query({
        TableName: this.appointmentsTable,
        IndexName: this.indexName,
        KeyConditionExpression: 'appointmentId = :appointmentId AND userId = :userId',
        ExpressionAttributeValues: {
          ':appointmentId': appointmentId,
          ':userId': userId
        }
      })
      .promise()

    const items = result.Items[0]
    return items as AppointmentItem
  }

  async createAppointment(appointment: AppointmentItem): Promise<AppointmentItem> {
    await this.docClient.put({
      TableName: this.appointmentsTable,
      Item: appointment
    }).promise()

    return appointment
  }

  async deleteAppointment(appointmentItem: AppointmentItem): Promise<boolean> {
    logger.info(`-----User to  delete: ${appointmentItem.userId} -- appointmentId: ${appointmentItem.appointmentId}`)
    const result = await this.docClient.delete({
      TableName: this.appointmentsTable,
      Key: {
        "userId": appointmentItem.userId,
        "createdAt": appointmentItem.createdAt
      },
      ConditionExpression: "appointmentId = :appointmentId",
      ExpressionAttributeValues: {
        ":appointmentId": appointmentItem.appointmentId
      }
    }).promise()
    if (result.$response.error)
      throw new Error('Failed to delete item: ' + result.$response.data)

    return true
  }


  async updateAppointment(appointmentItem:AppointmentItem): Promise<AppointmentItem> {
    logger.info(`-----User to  update: ${appointmentItem.userId} -- appointmentId: ${appointmentItem.appointmentId}`)

      var expressionAttibutes = {
        ":appointmentId": appointmentItem.appointmentId,
        ":done": appointmentItem.done,
        ":name": appointmentItem.name,
        ":appointmentDate": appointmentItem.appointmentDate
      }
      var updateExpression = "set done = :done, appointmentDate=:appointmentDate, #n=:name"

      if(appointmentItem.attachmentUrl !== undefined){
        
        expressionAttibutes[":attachmentUrl"] = appointmentItem.attachmentUrl
        updateExpression += ', attachmentUrl = :attachmentUrl'
      }else{
        updateExpression += ' REMOVE attachmentUrl'
      }
      

    const result = await this.docClient.update({
      TableName: this.appointmentsTable,
      Key: {
        "userId": appointmentItem.userId,
        "createdAt": appointmentItem.createdAt
      },
      ConditionExpression: "appointmentId = :appointmentId",
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttibutes,
      ExpressionAttributeNames:{
        "#n": "name"
      },
      ReturnValues: "UPDATED_NEW"
    }).promise()
    if (result.$response.error)
      throw new Error('Failed to update item: ' + appointmentItem)
    return appointmentItem
  }

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
