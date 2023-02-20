import { ExternalTokenError } from '@/application/entities/errors/external-token-error';
import { ExternalToken } from '@/application/entities/external-token';
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
  it('should validade a externalToken', () => {
    const error = new ExternalTokenError('Invalid token lenght');
    expect(() =>
      makeSubscription({
        externalToken: new ExternalToken('abcd'),
      })
    ).toThrow(error);
  });
});
