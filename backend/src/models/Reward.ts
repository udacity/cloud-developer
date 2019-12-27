export interface Reward {
  userId: string
  rewardId: string
  createdAt: string
  name: string
  redeemed: boolean
  cost: number
  attachmentUrl?: string
  redeemedAt?: string
}
