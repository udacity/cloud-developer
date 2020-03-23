const AWS = require('aws-sdk');
const uuid = require('uuid');

const doClient = new AWS.DynamoDB.DocumentClient();
const groupsTable = process.env.GROUPS_TABLE;


exports.handler = async (event)=>{
   
    console.log('Processing Event: ',event);

    const itemId = uuid.v4();

    const parsedBody = JSON.parse(event.body);

    const newItem = {
        id: itemId,
        ...parsedBody
    }
    
    await doClient.put({
        TableName:groupsTable,
        Item:newItem
    }).promise();
    
    return{
        statusCode:201,
        headers:{
            'Access-Control-Allow-Origin':'*'
        },
        body: JSON.stringify({newItem})
    }
}