import { TokenRepository } from '@/application/repositories/token-repository';
import { HttpClient } from '@/application/gateways/http';
import { SubscriptionRepository } from '@/application/repositories/subscription-repository';
import { NotFoundError } from '@/application/use-cases/errors/not-found-error';

type Output = boolean;
type Input = {
  title: string;
  description: string;
};

export type NotifyIntegratedDevice = (input: Input) => Promise<Output>;

type Setup = (
  subscriptionRepository: SubscriptionRepository,
  tokenRepository: TokenRepository,
  httpClient: HttpClient
) => NotifyIntegratedDevice;

export const setupNotifyIntegratedDevice: Setup =
  (subscriptionRepository, tokenRepository, httpClient) =>
  async ({ title, description }) => {
    const internalToken = await tokenRepository.load();
    if (!internalToken) {
      throw new NotFoundError('internalToken');
    }
    const notificationToken = await subscriptionRepository.load(
      internalToken.value
    );
    if (!notificationToken) {
      throw new NotFoundError('notificationToken');
    }
    const body = {
      to: notificationToken,
      notification: {
        title,
        body: description,
        badge: 'alarm.jpg',
      },
    };
    const response = await httpClient.request({
      method: 'post',
      url: 'https://fcm.googleapis.com/fcm/send',
      body,
      headers: {
        Authorization: `key=${FIREBASE_CONFIG.API_CLOUD_MESSAGE_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    return response.statusCode >= 400 ? false : true;
  };
