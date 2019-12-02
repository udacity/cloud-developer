import { apiEndpoint } from '../config'
import { Reward } from '../types/Reward';
import { CreateRewardRequest } from '../types/CreateRewardRequest';
import Axios from 'axios'
import { UpdateRewardRequest } from '../types/UpdateRewardRequest';

export async function getRewards(idToken: string): Promise<Reward[]> {
  console.log('Fetching rewards')

  const response = await Axios.get(`${apiEndpoint}/rewards`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  console.log('Rewards:', response.data)
  return response.data.items
}

export async function createReward(
  idToken: string,
  newReward: CreateRewardRequest
): Promise<Reward> {
  const response = await Axios.post(`${apiEndpoint}/rewards`, JSON.stringify(newReward), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.data.item
}

export async function patchReward(
  idToken: string,
  rewardId: string,
  updatedReward: UpdateRewardRequest
): Promise<void> {
  await Axios.patch(`${apiEndpoint}/rewards/${rewardId}`, JSON.stringify(updatedReward), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export async function deleteReward(
  idToken: string,
  rewardId: string
): Promise<void> {
  await Axios.delete(`${apiEndpoint}/rewards/${rewardId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}

export async function getUploadUrl(
  idToken: string,
  rewardId: string
): Promise<string> {
  const response = await Axios.post(`${apiEndpoint}/rewards/${rewardId}/attachment`, '', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
  return response.data.uploadUrl
}

export async function uploadFile(uploadUrl: string, file: Buffer): Promise<void> {
  await Axios.put(uploadUrl, file)
}
