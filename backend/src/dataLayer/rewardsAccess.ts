import * as AWS from 'aws-sdk'
// import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

// const XAWS = AWSXRay.captureAWS(AWS)

import { Reward } from '../models/Reward'
import { UpdateRewardRequest } from '../requests/UpdateRewardRequest'
import * as helpers from './helpers'

export default class RewardsAccess {
  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly rewardsTable = process.env.REWARDS_TABLE,
    private readonly index = process.env.REWARDS_INDEX
  ) { }

  async getRewards(userId: string): Promise<Reward[]> {
    const result = await this.docClient
      .query({
        TableName: this.rewardsTable,
        IndexName: this.index,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId
        }
      })
      .promise()

    return result.Items as Reward[]
  }

  async createReward(reward: Reward): Promise<Reward> {
    await this.docClient
      .put({
        TableName: this.rewardsTable,
        Item: reward
      })
      .promise()

    return reward
  }

  async updateReward(
    userId: Reward['userId'],
    rewardId: Reward['rewardId'],
    updatedReward: UpdateRewardRequest
  ): Promise<void> {
    const ExpressionAttributeNames = {
      "#name": "name"
    }
    const ExpressionAttributeValues = {
      ':name': updatedReward.name,
      ':redeemed': updatedReward.redeemed,
      ':redeemedAt': updatedReward.redeemed ? (new Date()).toISOString() : undefined,
    }
    const UpdateExpression = helpers.getUpdateExpression(ExpressionAttributeValues, ExpressionAttributeNames)

    await this.docClient
      .update({
        TableName: this.rewardsTable,
        Key: {
          userId: userId,
          rewardId: rewardId
        },
        UpdateExpression,
        ExpressionAttributeNames,
        ExpressionAttributeValues
      })
      .promise()
  }

  async deleteReward(userId: Reward['userId'], rewardId: Reward['rewardId']): Promise<void> {
    await this.docClient
      .delete({
        TableName: this.rewardsTable,
        Key: {
          userId: userId,
          rewardId: rewardId
        }
      })
      .promise()
  }
}

function createDynamoDBClient() {
  if (process.env.IS_OFFLINE) {
    console.log('Creating a local DynamoDB instance')
    return new AWS.DynamoDB.DocumentClient({
      region: "localhost",
      accessKeyId: "MOCK_ACCESS_KEY_ID",
      secretAccessKey: "MOCK_SECRET_ACCESS_KEY",
      endpoint: "http://localhost:8000"
    });
  }

  // return new XAWS.DynamoDB.DocumentClient()
  return new AWS.DynamoDB.DocumentClient()
}
