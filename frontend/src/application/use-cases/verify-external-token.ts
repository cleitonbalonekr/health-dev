import { ExternalToken } from '@/application/entities/external-token';
import { Subscription } from '@/application/entities/subscription';
import { SubscriptionRepository } from '@/application/repositories/subscription-repository';

type Input = {
  externalToken: string;
};

type Output = boolean;

export type VerifyExternalToken = (input: Input) => Promise<Output>;

type Setup = (
  subscriptionRepository: SubscriptionRepository
) => VerifyExternalToken;

export const setupVerifyExternalToken: Setup =
  (subscriptionRepository) =>
  async ({ externalToken }) => {
    let token: ExternalToken;
    try {
      token = new ExternalToken(externalToken);
    } catch (error) {
      return false;
    }
    const response = await subscriptionRepository.load(token);
    return response ? true : false;
  };
