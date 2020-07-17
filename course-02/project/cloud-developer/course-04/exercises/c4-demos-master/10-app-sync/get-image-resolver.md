

Request mapping template:

```
{
    "version": "2017-02-28",
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

Response mapping template


```
$util.toJson($ctx.result.items[0])
```
