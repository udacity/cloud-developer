import { User } from '../models/UserItem'
import { UserAccess } from '../data-layer/usersAccess'
import { getToken, parseUserId } from '../auth/utils'

const userAccess = new UserAccess()

export async function userExists(authHeader: string): Promise<User> {
  const jwtToken = getToken(authHeader)
  const user: User = {id: parseUserId(jwtToken)}
  const exists = await userAccess.userExists(user.id)

  if(exists) {
    return user
  }

  return undefined
}

export async function createUser(authHeader: string): Promise<User> {
  const jwtToken = getToken(authHeader)
  const user : User = {id: parseUserId(jwtToken)}
  const exists = await userAccess.userExists(user.id)

  if(!exists) {
    return user
  }

  return await userAccess.createUser(user)
}
