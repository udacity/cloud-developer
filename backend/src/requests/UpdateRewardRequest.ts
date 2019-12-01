import { Reward } from '../models/Reward'

export type UpdateRewardRequest = Pick<Reward, 'redeemed' | 'name' | 'redeemedAt'>