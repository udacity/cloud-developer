import {TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate'
import * as AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import  *  as AWSXRay from 'aws-xray-sdk'
import { createLogger } from '../utils/logger'

const logger = createLogger('getToDO')

const XAWS = AWSXRay.captureAWS(AWS)

//const util = require('aws-sdk/lib/util')
//util.Buffer = require('some-buffer-implementation').Buffer
const indexName = process.env.USER_ID_INDEX
export class ToDoItem{

    private readonly docClient: DocumentClient = createDynamoDBClient()
    private readonly ToDoTable  = process.env.ToDoTable

    constructor(){

    }

    async getAllToDOItems(userId: string): Promise<TodoItem[]> {
        logger.info('Getting all to do items')

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
        logger.info('Creating all to do items')

        const result = await this.docClient.put({
            TableName: this.ToDoTable,
            Item : TodoItem

        }).promise()

      console.log(  result.$response.data )
      return TodoItem

    }

    async updateToDoItem(TodoUpdate : TodoUpdate , todo: string ): Promise<TodoUpdate> {
        logger.info('in update done', TodoUpdate.done)
        logger.info('in update due date ', TodoUpdate.dueDate)
        logger.info('in update name ', TodoUpdate.name)
        logger.info('todoId ', todo)
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
     logger.info('before update')
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
        logger.info('delete to do item')
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
        return new XAWS.DynamoDB.DocumentClient({
            region: 'localhost',
            endpoint : 'http://localhost:8000'
        })
    }
    else{
        return new XAWS.DynamoDB.DocumentClient();
    }
    }