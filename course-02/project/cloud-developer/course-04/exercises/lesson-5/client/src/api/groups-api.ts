import { GroupModel } from '../types/GroupModel'
import { apiEndpoint } from '../config'
import { GroupUploadInfo } from '../types/GroupUploadInfo'

export async function getGroups(): Promise<GroupModel[]> {
  console.log('Fetching groups')

  const response = await fetch(`${apiEndpoint}/groups`)
  const result = await response.json()

  return result.items
}

export async function createGroup(
  idToken: string,
  newGroup: GroupUploadInfo
): Promise<GroupModel> {
  const reply = await fetch(`${apiEndpoint}/groups`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
    body: JSON.stringify({
      name: newGroup.name,
      description: newGroup.description
    })
  })
  const result = await reply.json()
  return result.newItem
}
