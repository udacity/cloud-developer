import "source-map-support/register";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult
} from "aws-lambda";

import { RedeemRewardRequest } from "../../../requests/UpdateRewardRequest";
import { createLogger } from "../../../utils/logger";
import { getUserId } from "../../utils";
import RewardRedeemer from "../../../services/RewardRedeemer";

const logger = createLogger("redeemReward");

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const rewardId = event.pathParameters.rewardId;
  const { redeemed }: RedeemRewardRequest = JSON.parse(event.body);
  const userId = getUserId(event);

  if (!userId || !rewardId) {
    logger.error("Redeem reward missing info", {
      rewardId
    });
    return {
      statusCode: 422,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: "Missing rewardId or userId"
    };
  }

  const redeemer = new RewardRedeemer(userId, rewardId);

  try {
    const result = await redeemer.perform(redeemed);
    logger.info('RewardRedeemer perform result', result)
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(result)
    };
  } catch (error) {
    logger.error("Redeem reward failed", {
      rewardId,
      error
    });
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: "Server error"
    };
  }
};
