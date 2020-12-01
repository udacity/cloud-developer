'no strict'

const AWS = require('aws-sdk')
var _ = require('lodash')
const ec2 = new AWS.EC2({region: 'us-east-1'})

exports.handler = async (event) => {
  console.log('Processing event: ', event)

  const reservations = await getReservations()
  const allInstances = _.flatMap(reservations, (reservation) => reservation.Instances)

  console.log('Current instances running: ', allInstances)

  if (allInstances.length === 0) {
    console.log('No instances to terminate', allInstances)
    return
  }

  const instanceId = selectInstanceIdToTerminate(allInstances)
  await terminateInstance(instanceId)
}

async function getReservations() {
  const result = await ec2.describeInstances({
    Filters: [
      {
        Name: 'instance-state-name',
        Values: ['running']
      }
    ]
  }).promise()

  console.log('Reservations: ', JSON.stringify(result))

  return result.Reservations
}

function selectInstanceIdToTerminate(instances) {
  const instanceToTerminate = _.sample(instances)
  return instanceToTerminate.InstanceId
}

async function terminateInstance(instanceId) {
  console.log('Terminating instance', instanceId)

  await ec2.terminateInstances({
    InstanceIds: [
      instanceId
    ]
  }).promise()

  console.log('Instance was terminated')
}
