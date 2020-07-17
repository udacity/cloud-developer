

```
{
    "version" : "2017-02-28",
    "operation" : "Scan",
    "limit": $util.defaultIfNull(${ctx.args.limit}, 20),
    "nextToken": $util.toJson($util.defaultIfNullOrBlank($ctx.args.nextToken, null))
}
```

```
{
  "items": $util.toJson($ctx.result.items),
  "nextToken": "$ctx.result.nextToken"
}
```
