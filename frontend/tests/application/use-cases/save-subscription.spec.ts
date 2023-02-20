import { ExternalTokenError } from '@/application/entities/errors/external-token-error';
import { ExternalToken } from '@/application/entities/external-token';
import { SubscriptionRepository } from '@/application/respositories/subscription-repository';
import {
  SaveSubscription,
  setupSaveSubscription,
} from '@/application/use-cases/save-subscription';
import { mock, MockProxy } from 'vitest-mock-extended';
import { makeSubscription } from '../factories/subscription-factory';
describe('SaveSubscription', () => {
  let sut: SaveSubscription;
  let subscriptionRepository: MockProxy<SubscriptionRepository>;
  let params: any;
  beforeAll(() => {
    subscriptionRepository = mock();
    params = {
      externalToken: 'fake_external_token',
      notificationToken: 'fake_notification_token',
    };
  });
  beforeEach(() => {
    subscriptionRepository.save.mockResolvedValue(true);
    sut = setupSaveSubscription(subscriptionRepository);
  });

  it('Should call SubscriptionRepository.save with correct values', async () => {
    await sut(params);
    expect(subscriptionRepository.save).toHaveBeenCalledTimes(1);
    expect(subscriptionRepository.save).toHaveBeenCalledWith(
      makeSubscription({
        notificationToken: params.notificationToken,
        externalToken: new ExternalToken(params.externalToken),
      })
    );
  });

  it('should throw an error when a invalid external token is provided', async () => {
    const promise = sut({ ...params, externalToken: 'abcd' });
    expect(promise).rejects.toThrow(ExternalTokenError);
  });

  it('should return true on success', async () => {
    const response = await sut(params);
    expect(response).toBeTruthy();
  });
});
