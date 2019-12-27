import { User } from '../models/User';
import { UpdateUserRequest } from '../requests/UpdateUserRequest';
import createDynamoDBClient from './dynamoDBAccess';

export default class UserAccess {
  constructor(
    private readonly docClient = createDynamoDBClient(),
    private readonly usersTable = process.env.USERS_TABLE
  ) {}

  async getUser(userId: string): Promise<User> {
    const result = await this.docClient
      .get({
        TableName: this.usersTable,
        Key: {
          userId
        }
      })
      .promise();

    return result.Item as User;
  }

  async createUser(user: User): Promise<User> {
    await this.docClient
      .put({
        TableName: this.usersTable,
        Item: user
      })
      .promise();

    return user;
  }

  async updateUser(
    userId: User['userId'],
    updatedUser: UpdateUserRequest
  ): Promise<void> {
    await this.docClient
      .update({
        TableName: this.usersTable,
        Key: {
          userId: userId
        },
        UpdateExpression: 'SET balance = :balance',
        ExpressionAttributeValues: {
          ':balance': updatedUser.balance
        }
      })
      .promise();
  }

  async incrementBalance(
    userId: User['userId'],
    additionalBalance: number
  ): Promise<number> {
    const user = await this.getUser(userId);
    let newBalance = 0;

    if (!user) {
      // TODO: maybe create user on sign up? Creating the user here is hard to maintain, since not all info for user
      // creation may be available at this point
      newBalance = additionalBalance;
      await this.createUser({ userId, balance: newBalance });
    } else {
      const { balance } = user;
      newBalance = balance + additionalBalance;
      await this.updateUser(userId, { balance: newBalance });
    }

    return newBalance;
  }
}
