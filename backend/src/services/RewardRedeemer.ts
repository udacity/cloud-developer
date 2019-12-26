import { Reward } from "../models/Reward";
import { User } from "../models/User";
import RewardsAccessor from "../dataLayer/rewardsAccess";
import UserAccessor from "../dataLayer/usersAccess";
import { createLogger } from "../utils/logger";

const logger = createLogger("RewardRedeemer");

export default class RewardRedeemer {
  userId: User["userId"];
  rewardId: Reward["rewardId"];
  userAccessor: UserAccessor;
  rewardsAccessor: RewardsAccessor;

  constructor(userId: User["userId"], rewardId: Reward["rewardId"]) {
    this.userId = userId;
    this.rewardId = rewardId;
    this.userAccessor = new UserAccessor();
    this.rewardsAccessor = new RewardsAccessor();
  }

  async perform(redeemed: Reward["redeemed"]) {
    logger.info(`Redeeming reward ${this.rewardId} for user ${this.userId}`);

    const reward = await this.rewardsAccessor.getReward(
      this.userId,
      this.rewardId
    );
    await this.rewardsAccessor.updateReward(this.userId, this.rewardId, {
      redeemed
    });

    try {
      const balance = await this.userAccessor.incrementBalance(
        this.userId,
        redeemed ? -reward.cost : reward.cost
      );
      return {
        balance
      };
    } catch (e) {
      logger.error(`Failed to update balance for user ${this.userId}`, e);
      await this.rewardsAccessor.updateReward(this.userId, this.rewardId, {
        redeemed: reward.redeemed
      });
      throw e;
    }
  }
}
