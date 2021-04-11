const AWS = require('aws-sdk');
const got = require('got');

// Name of a service, any string
const serviceName = process.env.SERVICE_NAME;
// URL of a service to test
const url = process.env.URL;

// CloudWatch client
const cloudwatch = new AWS.CloudWatch();

exports.handler = async (event) => {
  const response = await got(url);

  const totalTime = response.timings.phases.total;
  const requestWasSuccessful = response.statusCode === 200;

  console.log(`Results totalTime=${totalTime}, requestWasSuccessful=${requestWasSuccessful}`);

  await cloudwatch.putMetricData({
    MetricData: [
      {
        MetricName: 'Latency',
        Dimensions: [
          {
            Name: 'ServiceName',
            Value: serviceName
          }
        ],
        Unit: 'Milliseconds',
        Value: totalTime
      }
    ],
    Namespace: 'Udacity/Serveless'
  }).promise();

  await cloudwatch.putMetricData({
    MetricData: [
      {
        MetricName: 'Status',
        Dimensions: [
          {
            Name: 'ServiceName',
            Value: serviceName
          }
        ],
        Unit: 'Count',
        Value: requestWasSuccessful ? : 1 : 0
      }
    ],
    Namespace: 'Udacity/Serveless'
  }).promise();
}

