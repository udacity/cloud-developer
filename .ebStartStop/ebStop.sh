# Stop ElasticBeanstalk from terminal
aws --profile udacity lambda invoke \
    --function-name StopElasticBeanstalk  \
    response.json && rm response.json

