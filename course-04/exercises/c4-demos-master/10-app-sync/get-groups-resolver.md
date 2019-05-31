Table name: ``

Request mapping template:

```
{
    "version" : "2017-02-28",
    "operation" : "Scan"
}
```

Response mapping template:

```
$util.toJson($ctx.result.items)
```
