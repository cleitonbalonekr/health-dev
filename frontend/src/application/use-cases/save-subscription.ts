import { ExternalToken } from '@/application/entities/external-token';
import { Subscription } from '@/application/entities/subscription';
import { SubscriptionRepository } from '@/application/respositories/subscription-repository';

type Input = {
  externalToken: string;
  notificationToken: string;
};

type Output = boolean;

export type SaveSubscription = (input: Input) => Promise<Output>;

type Setup = (
  subscriptionRepository: SubscriptionRepository
) => SaveSubscription;

export const setupSaveSubscription: Setup =
  (subscriptionRepository) =>
  async ({ externalToken, notificationToken }) => {
    const subscription = new Subscription({
      notificationToken,
      externalToken: new ExternalToken(externalToken),
    });
    const response = await subscriptionRepository.save(subscription);
    return response;
  };
