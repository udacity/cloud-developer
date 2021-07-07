import * as AWS  from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { User } from '../models/UserItem'

const XAWS = AWSXRay.captureAWS(AWS)

export class UserAccess {

  constructor(
    private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
    private readonly usersTable = process.env.USERS_TABLE) {
  }

  async userExists(userId: string): Promise<Boolean> {
    const result = await this.docClient
      .get({
        TableName: this.usersTable,
        Key: {
          id: userId
        }
      })
      .promise()
  
    return !!result.Item
  }

  async createUser(user: User): Promise<User> {
    await this.docClient.put({
        TableName: this.usersTable,
        Item: user
      }).promise()

    return user
  }
}
