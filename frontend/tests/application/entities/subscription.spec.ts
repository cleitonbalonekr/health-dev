import { Subscription } from '@/application/entities/subscription';
import { makeSubscription } from '../factories/subscription-factory';

describe('Subscription', () => {
  it('should create a subscription', () => {
    const sub = makeSubscription();
    expect(sub).toBeInstanceOf(Subscription);
    expect(sub).toMatchObject({
      notificationToken: sub.notificationToken,
      externalToken: sub.externalToken,
    });
  });
});
