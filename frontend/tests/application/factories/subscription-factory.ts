import { ExternalToken } from '@/application/entities/external-token';
import {
  Subscription,
  SubscriptionProps,
} from '@/application/entities/subscription';

type Override = Partial<SubscriptionProps>;

export const makeSubscription = (override?: Override) => {
  return new Subscription({
    notificationToken: 'fake_notification_token',
    externalToken: new ExternalToken('fake_external_token'),
    ...override,
  });
};
