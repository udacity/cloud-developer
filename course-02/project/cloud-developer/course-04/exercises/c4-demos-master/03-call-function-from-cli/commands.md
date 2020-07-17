
# Call function a function synchronously:

```s
aws lambda invoke --function-name hello-world \
  --invocation-type RequestResponse \
  --log-type Tail --payload '{ "name": "AWS Lambda" }' \
  result.txt
```

To decode log output:

```s
echo <LogResult> | base64 -D
```

# Call function asynchronously:

```s
aws lambda invoke --function-name hello-world \
  --invocation-type Event \
  --log-type Tail \
  --payload '{ "name": "AWS Lambda" }' \
  result.txt
```

