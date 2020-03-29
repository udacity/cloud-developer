const AWS = require('aws-sdk')
const axios = require('axios')

// Name of a service, any string
const serviceName = process.env.SERVICE_NAME
// URL of a service to test
const url = process.env.URL

// CloudWatch client
const cloudwatch = new AWS.CloudWatch();

exports.handler = async (event) => {
  // TODO: Use these variables to record metric values
  let endTime
  let requestWasSuccessful


  const startTime = timeInMs()
  console.log("StartTime: "+ startTime)
  try{
      // TODO: Record if a response was successful or not
    const response = await axios.get(url)
    console.log("Response --------------- Status Code: "+response.status);
    endTime = timeInMs()
    console.log("Stop time: "+endTime)
      await cloudwatch.putMetricData({
        MetricData: [
          {
            MetricName: 'Successful', // Use different metric names for different values, e.g. 'Latency' and 'Successful'
            Dimensions: [
              {
                Name: 'MyExample',
                Value: serviceName
              }
            ],
            Unit: 'Count', // 'Count' or 'Milliseconds'
            Value: 1 // Total value
          }
        ],
        Namespace: 'Udacity/Serveless'
      }).promise()

  }catch(erro){
    console.log("Erro -----"+ erro)
  }finally{

    await cloudwatch.putMetricData({
      MetricData: [
        {
          MetricName: 'Latency', // Use different metric names for different values, e.g. 'Latency' and 'Successful'
          Dimensions: [
            {
              Name: 'MyExample',
              Value: serviceName
            }
          ],
          Unit: 'Milliseconds', // 'Count' or 'Milliseconds'
          Value: endTime-startTime // Total value
        }
      ],
      Namespace: 'Udacity/Serveless'
    }).promise()


  }


  // Example of how to write a single data point
  // await cloudwatch.putMetricData({
  //   MetricData: [
  //     {
  //       MetricName: 'MetricName', // Use different metric names for different values, e.g. 'Latency' and 'Successful'
  //       Dimensions: [
  //         {
  //           Name: 'ServiceName',
  //           Value: serviceName
  //         }
  //       ],
  //       Unit: '', // 'Count' or 'Milliseconds'
  //       Value: 0 // Total value
  //     }
  //   ],
  //   Namespace: 'Udacity/Serveless'
  // }).promise()
  // TODO: Record time it took to get a response


}

function timeInMs() {
  return new Date().getTime()
}
