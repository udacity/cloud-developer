
Table name: `Groups-dev`

Request mapping template:

```
## Below example shows how to look up an item with a Primary Key of "id" from GraphQL arguments
## The helper $util.dynamodb.toDynamoDBJson automatically converts to a DynamoDB formatted request
## There is a "context" object with arguments, identity, headers, and parent field information you can access.
## It also has a shorthand notation avaialable:
##  - $context or $ctx is the root object
##  - $ctx.arguments or $ctx.args contains arguments
##  - $ctx.identity has caller information, such as $ctx.identity.username
##  - $ctx.request.headers contains headers, such as $context.request.headers.xyz
##  - $ctx.source is a map of the parent field, for instance $ctx.source.xyz
## Read more: https://docs.aws.amazon.com/appsync/latest/devguide/resolver-mapping-template-reference.html

{
    "version": "2017-02-28",
    "operation": "GetItem",
    "key": {
        "id": $util.dynamodb.toDynamoDBJson($ctx.args.id),
    }
}
```

Response mapping template:

```
## Pass back the result from DynamoDB. **
$util.toJson($ctx.result)
```
