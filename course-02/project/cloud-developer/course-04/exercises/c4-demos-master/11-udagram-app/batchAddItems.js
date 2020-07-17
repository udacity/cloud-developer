const AWS = require('aws-sdk')

const documentClient = new AWS.DynamoDB.DocumentClient({
  region: 'us-east-1'
})

documentClient.batchWrite({
  RequestItems: {
    'Groups-dev': [
      {
        PutRequest: {
          Item: {
            "id": "1",
            "name": "Dogs",
            "description": "Only dog images here!"
          }
        }
      },
      {
        PutRequest: {
          Item: {
            "id": "2",
            "name": "Nature",
            "description": "What can be a better object for photography"
          }
        }
      },
      {
        PutRequest: {
          Item: {
            "id": "3",
            "name": "Cities",
            "description": "Creative display of urban settings"
          }
        }
      },
      {
        PutRequest: {
          Item: {
            "id": "4",
            "name": "Computers",
            "description": "For the techies among us"
          }
        }
      },
    ]
  }
}).promise()
.then(() => {
  console.log('Items added')
})
.catch((e) => [
  console.log('Failed: ', e.message)
])





