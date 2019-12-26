import { Reward } from "../models/Reward";

export type UpdateRewardRequest = Partial<Pick<Reward, "redeemed" | "name" | "cost">>;

export type RedeemRewardRequest = { redeemed: Reward["redeemed"] };
