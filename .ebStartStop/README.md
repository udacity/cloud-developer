https://aws.amazon.com/premiumsupport/knowledge-center/schedule-elastic-beanstalk-stop-restart/

// create iam role elasticbeanstalk-lambda-role
aws --profile udacity iam create-role --role-name elasticbeanstalk-lambda-role --assume-role-policy-document file://Lambda.json

// attach policy AWSElasticBeanstalkFullAccess to aim role elasticbeanstalk-lambda-role
aws --profile udacity iam attach-role-policy --policy-arn arn:aws:iam::aws:policy/AWSElasticBeanstalkFullAccess --role-name elasticbeanstalk-lambda-role

// create StopElasticBeanstalk function
aws --profile udacity lambda create-function \
--function-name StopElasticBeanstalk \
--zip-file fileb://StopElasticBeanstalk.py.zip \
--role arn:aws:iam::428940412869:role/elasticbeanstalk-lambda-role \
--handler StopElasticBeanstalk.handler \
--runtime python3.6 --region us-east-1

// create StartElasticBeanstalk function
aws --profile udacity lambda create-function \
--function-name StartElasticBeanstalk \
--zip-file fileb://StartElasticBeanstalk.py.zip \
--role arn:aws:iam::428940412869:role/elasticbeanstalk-lambda-role \
--handler StartElasticBeanstalk.handler \
--runtime python3.6 --region us-east-1

// Stop ElasticBeanstalk from terminal
aws --profile udacity lambda invoke \
    --function-name StopElasticBeanstalk  \
    response.json

// Start ElasticBeanstalk from terminal
aws --profile udacity lambda invoke \
    --function-name StartElasticBeanstalk  \
    response.json
