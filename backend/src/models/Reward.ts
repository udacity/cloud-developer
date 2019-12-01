export interface Reward {
  userId: string
  rewardId: string
  createdAt: string
  name: string
  redeemed: boolean
  attachmentUrl?: string
  redeemedAt?: string
}
