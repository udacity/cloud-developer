import { ScheduledHandler } from 'aws-lambda';
// import { Identity } from 'auth0'

import Auth0 from '../../dataLayer/auth0ManagementAccess'
// import Google from '../../dataLayer/googleAccess'
// import TaskLists from '../../dataLayer/taskListsAccess'
import TaskUpdater from '../../services/TaskUpdater'
import { createLogger } from '../../utils/logger'
// import { GoogleTaskList, TaskList } from '../../models/TaskList'

const GOOGLE_PROVIDER = 'google-oauth2'
const auth0 = new Auth0()
// const taskListsAccessor = new TaskLists()
const logger = createLogger('pollTasks')

export const handler: ScheduledHandler = async () => {
  console.log('\n\nPoll tasks running\n\n');

  try {
    const googleIdentities = await getGoogleIdentities();
    console.log('googleIdentities :', googleIdentities);

    if (!googleIdentities.length) {
      logger.warn('No Google identities found for users')
      return
    }

    const taskUpdaters = googleIdentities.map(id => new TaskUpdater(id.user_id, id.access_token));
    await Promise.all(taskUpdaters.map(taskUpdater => taskUpdater.perform()))

    // const googleTaskListsPerUser = await getGoogleTaskListsPerUser(googleIdentities)
    // console.log('googleTaskListsPerUser :', googleTaskListsPerUser);

    // await Promise.all(Object.keys(googleTaskListsPerUser).map(userId => {
    //   const googleTaskLists = googleTaskListsPerUser[userId];
    //   return syncCompletedTasksForUser(userId, googleTaskLists);
    // }))
  } catch (e) {
    logger.error('Failed to sync users\n', e)
  }
}

async function getGoogleIdentities() {
  const users = await auth0.getUsers();
  return (users || [])
    .map(user => user.identities)
    .reduce((ids, val) => ids.concat(val), [])
    .filter(id => id.provider === GOOGLE_PROVIDER);
}

// async function getGoogleTaskListsPerUser(identities: Identity[] = []) {
//   const allLists: GoogleTaskList[][] = await Promise.all(identities.map(id => google.getTaskLists(id.access_token)))
//   return identities.reduce<Record<string, GoogleTaskList[]>>((acc, identity, i) => {
//     const { user_id } = identity;
//     acc[user_id] = allLists[i]
//     return acc
//   }, {})
// }

// async function syncCompletedTasksForUser(userId: string, googleTaskLists: GoogleTaskList[]) {
//   return googleTaskLists.map(async (googleTaskList) => {
//     const taskList = await taskListsAccessor.upsertTaskList({
//       userId,
//       id: googleTaskList.id,
//       title: googleTaskList.title
//     })
//     return syncCompletedTasksForTaskList(taskList);
//   })
// }
