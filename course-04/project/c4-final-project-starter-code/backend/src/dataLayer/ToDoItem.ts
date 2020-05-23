import {TodoItem} from '../models/TodoItem'
import * as AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

export class ToDoItem{

    private readonly docClient: DocumentClient = createDynamoDBClient()
    private readonly ToDoTable  = process.env.ToDoTable

    constructor(){

    }

    async getAllToDOItems(): Promise<TodoItem[]> {
        console.log('Getting all to do items')

        const result = await this.docClient.scan({
            TableName: this.ToDoTable
        }).promise()

        const items = result.Items
        return items as TodoItem[]
    }

    async createAllToDoItems(TodoItem) : Promise<TodoItem> {
        console.log('Creating all to do items')

        const result = await this.docClient.put({
            TableName: this.ToDoTable,
            Item : TodoItem

        }).promise()

      console.log(  result.$response.data )
      return TodoItem

    }

}

function createDynamoDBClient (){
    console.log(' process enc value is '+ process.env.IS_OFFLINE)
    if(process.env.IS_OFFLINE == 'true'){
        console.log('Creating a local dynamo db instance');
        return new AWS.DynamoDB.DocumentClient({
            region: 'localhost',
            endpoint : 'http://localhost:8000'
        })
    }
    else{
        return new AWS.DynamoDB.DocumentClient();
    }
    }