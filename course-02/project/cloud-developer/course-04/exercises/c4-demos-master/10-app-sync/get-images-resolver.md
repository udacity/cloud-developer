

Request mapping template:

```
{
    "version" : "2017-02-28",
    "operation" : "Query",
    "query" : {
        "expression": "groupId = :groupId",
        "expressionValues" : {
            ":groupId" : $util.dynamodb.toDynamoDBJson($ctx.args.groupId)
        }
    }
}
```

Response mapping template:

```
$util.toJson($ctx.result.items)
```
