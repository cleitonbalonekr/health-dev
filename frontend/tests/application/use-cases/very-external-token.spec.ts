import { ExternalTokenError } from '@/application/entities/errors/external-token-error';
import { ExternalToken } from '@/application/entities/external-token';
import { SubscriptionRepository } from '@/application/repositories/subscription-repository';
import {
  VerifyExternalToken,
  setupVerifyExternalToken,
} from '@/application/use-cases/verify-external-token';
import { mock, MockProxy } from 'vitest-mock-extended';
describe('VerifyExternalToken', () => {
  let sut: VerifyExternalToken;
  let subscriptionRepository: MockProxy<SubscriptionRepository>;
  let params: any;
  beforeAll(() => {
    subscriptionRepository = mock();
    params = {
      externalToken: 'fake_external_token',
    };
  });
  beforeEach(() => {
    subscriptionRepository.verifyToken.mockResolvedValue(true);
    sut = setupVerifyExternalToken(subscriptionRepository);
  });

  it('Should call SubscriptionRepository.verifyToken with correct values', async () => {
    await sut(params);
    expect(subscriptionRepository.verifyToken).toHaveBeenCalledTimes(1);
    expect(subscriptionRepository.verifyToken).toHaveBeenCalledWith(
      new ExternalToken(params.externalToken)
    );
  });

  it('should return false when a invalid external token is provided', async () => {
    const response = await sut({ ...params, externalToken: 'abcd' });
    expect(response).toBeFalsy();
  });

  it('should return true on success', async () => {
    const response = await sut(params);
    expect(response).toBeTruthy();
  });
});
