import * as AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { User } from '../models/User'
import { UpdateUserRequest } from '../requests/UpdateUserRequest'

export default class UserAccess {
  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly usersTable = process.env.USERS_TABLE,
  ) { }

  async getUser(userId: string): Promise<User> {
    const result = await this.docClient
      .get({
        TableName: this.usersTable,
        Key: {
          userId,
        }
      })
      .promise()

    return result.Item as User
  }

  async createUser(user: User): Promise<User> {
    await this.docClient
      .put({
        TableName: this.usersTable,
        Item: user
      })
      .promise()

    return user
  }

  async updateUser(userId: User['userId'], updatedUser: UpdateUserRequest): Promise<void> {
    await this.docClient
      .update({
        TableName: this.usersTable,
        Key: {
          userId: userId,
        },
        UpdateExpression: 'set balance = :balance',
        ExpressionAttributeValues: {
          ':balance': updatedUser.balance,
        }
      })
      .promise()
  }

  async incrementBalance(userId: User['userId'], additionalBalance: number): Promise<void> {
    // TODO: see if there's a way to do this in one query
    const user = await this.getUser(userId)
    if (!user) {
      // TODO: maybe create user on sign up? Creating the user here is hard to maintain, since not all info for user
      // creation may be available at this point
      console.log('\n\n new user with balance', additionalBalance, '\n\n');
      await this.createUser({ userId, balance: additionalBalance })
    } else {
      const { balance } = user;
      console.log('\n\n updated balance', balance + additionalBalance, '\n\n');
      await this.updateUser(userId, { balance: balance + additionalBalance })
    }
  }
}

function createDynamoDBClient() {
  if (process.env.IS_OFFLINE) {
    console.log('Creating a local DynamoDB instance')
    return new AWS.DynamoDB.DocumentClient({
      region: "localhost",
      accessKeyId: "MOCK_ACCESS_KEY_ID",
      secretAccessKey: "MOCK_SECRET_ACCESS_KEY",
      endpoint: "http://dynamo:8000"
    });
  }

  return new AWS.DynamoDB.DocumentClient()
}
