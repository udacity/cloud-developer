const AWS = require('aws-sdk')
const axios = require('axios')

// Name of a service, any string
const serviceName = process.env.SERVICE_NAME
// URL of a service to test
const url = process.env.URL

// CloudWatch client
const cloudwatch = new AWS.CloudWatch();

exports.handler = async (event) => {

  let endTime;
  let requestWasSuccessful;

  const startTime = timeInMs();

  try {
    await axios.get(url);
    requestWasSuccessful = true;
    
  } catch (error) {
    requestWasSuccessful = false;
  }
  finally {
    endTime = timeInMs();
  }

  const elapsed = endTime - startTime;
  


  
  await cloudwatch.putMetricData({
    MetricData: [
      {
        MetricName: 'Latency', // Use different metric names for different values, e.g. 'Latency' and 'Successful'
        Dimensions: [
          {
            Name: 'ServiceName',
            Value: serviceName
          }
        ],
        Unit: 'Milliseconds', // 'Count' or 'Milliseconds'
        Value: elapsed // Total value
      }
    ],
    Namespace: 'Udacity/Serveless'
  }).promise()

  await cloudwatch.putMetricData({
    MetricData: [
      {
        MetricName: 'Successful', // Use different metric names for different values, e.g. 'Latency' and 'Successful'
        Dimensions: [
          {
            Name: 'ServiceName',
            Value: serviceName
          }
        ],
        Unit: 'Count', // 'Count' or 'Milliseconds'
        Value: requestWasSuccessful? 1:0 // Total value
      }
    ],
    Namespace: 'Udacity/Serveless'
  }).promise()

}

function timeInMs() {
  return new Date().getTime()
}
