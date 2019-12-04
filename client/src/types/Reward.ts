export interface Reward {
  rewardId: string
  createdAt: string
  name: string
  redeemed: boolean
  cost: number
  redeemedAt?: string
  attachmentUrl?: string
}
