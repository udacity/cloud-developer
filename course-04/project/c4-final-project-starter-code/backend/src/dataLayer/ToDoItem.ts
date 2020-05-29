import {TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate'
import * as AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

//const util = require('aws-sdk/lib/util')
//util.Buffer = require('some-buffer-implementation').Buffer
const indexName = process.env.USER_ID_INDEX
export class ToDoItem{

    private readonly docClient: DocumentClient = createDynamoDBClient()
    private readonly ToDoTable  = process.env.ToDoTable

    constructor(){

    }

    async getAllToDOItems(userId: string): Promise<TodoItem[]> {
        console.log('Getting all to do items')

        // const result = await this.docClient.scan({
        //     TableName: this.ToDoTable
        // }).promise()

        const result = await this.docClient.query({
            TableName : this.ToDoTable,
            IndexName: indexName,
            KeyConditionExpression: "userId = :yyyy",
            ExpressionAttributeValues: {
                ":yyyy": userId
            }
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

    async updateToDoItem(TodoUpdate : TodoUpdate , todo: string ): Promise<TodoUpdate> {
        console.log('in update done', TodoUpdate.done)
        console.log('in update due date ', TodoUpdate.dueDate)
        console.log('in update name ', TodoUpdate.name)
        console.log('todoId ', todo)
        // var params = {
        //     TableName: this.ToDoTable,
        //     Key: {
        //         todoId : todo 
        //     },
        //     UpdateExpression: "set name = :name",
            
        //     ExpressionAttributeValues:{
        //         ":name": 'name'
        //     },
        //     ReturnValues:"UPDATED_NEW"
        // };
     console.log ('before update')
    // this.docClient.update(params, function(err, data) {
    //     if (err) {
    //         console.error("Unable to update item. Error JSON:", JSON.stringify(err));
    //     } else {
    //         console.log("UpdateItem succeeded:", JSON.stringify(data));
    //     }
    // })

      const result = await  this.docClient.update({
          TableName: this.ToDoTable,
          Key:{
            todoId : todo
          },
          UpdateExpression: "set #ts = :nameofapp , dueDate = :dd, done =:d ",
          ExpressionAttributeValues:{
              ":nameofapp":TodoUpdate.name,
              ":dd": TodoUpdate.dueDate,
              ":d": TodoUpdate.done
          },
          ExpressionAttributeNames:{

            "#ts": "name"

        },
          ReturnValues:"UPDATED_NEW"

        }).promise()

        console.log(  result.$response.data )
       console.log( 'after promise')

        return TodoUpdate
    }

    async deleteToDoItem(ToDo: string){
       const result = await this.docClient.delete({
            TableName: this.ToDoTable,
            Key:{
                todoId: ToDo
            }
        }).promise()

        console.log(result.$response.data)
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