
# Stage 1:

```
{
    "version": "2018-05-29",
    "operation" : "Query",
    "index" : "image-id-index",
    "query" : {
        "expression": "imageId = :imageId",
        "expressionValues" : {
            ":imageId" : {
                "S" : "${ctx.args.id}"
            }
        }
    }
}
```

```
$util.toJson($ctx.result.items[0])
```

# Stage 2:

```
{
    "operation": "GetItem",
    "key": {
        "id": $util.dynamodb.toDynamoDBJson($ctx.prev.result.groupId),
    }
}
```

```
## Raise a GraphQL field error in case of a datasource invocation error
#if($ctx.error)
    $util.error($ctx.error.message, $ctx.error.type)
#end
$util.qr($ctx.prev.result.put("group", $ctx.result))
## Pass back the result from DynamoDB. **
$util.toJson($ctx.prev.result)
```
