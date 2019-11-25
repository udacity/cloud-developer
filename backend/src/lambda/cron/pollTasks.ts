import { ScheduledHandler } from 'aws-lambda'

export const handler: ScheduledHandler = async (event) => {
  console.log('event :', event);
  console.log('scheduled event pollTasks ran!');
}