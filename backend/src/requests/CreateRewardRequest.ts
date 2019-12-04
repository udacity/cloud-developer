import { Reward } from '../models/Reward'

export type CreateRewardRequest = Pick<Reward, 'name' | 'cost'>
