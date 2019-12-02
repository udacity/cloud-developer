export interface Reward {
  rewardId: string
  createdAt: string
  name: string
  redeemed: boolean
  redeemedAt?: string
  attachmentUrl?: string
}
