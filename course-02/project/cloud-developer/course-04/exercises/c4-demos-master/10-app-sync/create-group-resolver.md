Table name: `GroupsTable`

Request mapping template:

```
{
    "version" : "2017-02-28",
    "operation" : "PutItem",
    "key" : {
        "id": $util.dynamodb.toDynamoDBJson($util.autoId()),
    },
    "attributeValues" : {
      "name": $util.dynamodb.toDynamoDBJson($ctx.args.request.name),
      "description": $util.dynamodb.toDynamoDBJson($ctx.args.request.description),
      "timestamp": $util.dynamodb.toDynamoDBJson("$util.time.nowISO8601()")
    }
}
```

Response mapping template:

```
$util.toJson($ctx.result)
```
