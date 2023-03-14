import { InternalToken } from '@/application/entities/internal-token';
import { HttpClient } from '@/application/gateways/http';
import { SubscriptionRepository } from '@/application/repositories/subscription-repository';
import { TokenRepository } from '@/application/repositories/token-repository';
import { NotFoundError } from '@/application/use-cases/errors/not-found-error';
import {
  setupNotifyIntegratedDevice,
  NotifyIntegratedDevice,
} from '@/application/use-cases/integration';
import { mock, MockProxy, mockReset } from 'vitest-mock-extended';

const makeFakeInternalToken = (fakeToken = 'valid_token') => {
  return new InternalToken(fakeToken);
};

describe('NotifyIntegratedDevice', () => {
  let sut: NotifyIntegratedDevice;
  let subscriptionRepository: MockProxy<SubscriptionRepository>;
  let tokenRepository: MockProxy<TokenRepository>;
  let httpClient: MockProxy<HttpClient>;
  let params: any;
  const fakeToken = 'valid_token';
  const fakeNotificationToken = 'valid_notification_token';

  beforeAll(() => {
    tokenRepository = mock();
    subscriptionRepository = mock();
    httpClient = mock();
    params = {
      title: 'fake_title',
      description: 'fake_description',
    };
  });
  beforeEach(() => {
    mockReset(tokenRepository);
    mockReset(subscriptionRepository);
    mockReset(httpClient);
    tokenRepository.load.mockResolvedValue(makeFakeInternalToken(fakeToken));
    subscriptionRepository.load.mockResolvedValue(fakeNotificationToken);
    httpClient.request.mockResolvedValue({
      statusCode: 200,
    });
    sut = setupNotifyIntegratedDevice(
      subscriptionRepository,
      tokenRepository,
      httpClient
    );
  });

  it('should call TokenRepository.load', async () => {
    await sut(params);
    expect(tokenRepository.load).toBeCalledTimes(1);
    expect(tokenRepository.load).toBeCalledWith();
  });
  it('should throw NotFoundError when internalToken does not exist', async () => {
    tokenRepository.load.mockResolvedValue(null);

    const promise = sut(params);

    await expect(promise).rejects.toThrow(new NotFoundError('internalToken'));
  });
  it('should call SubscriptionRepository.load', async () => {
    await sut(params);
    expect(subscriptionRepository.load).toBeCalledTimes(1);
    expect(subscriptionRepository.load).toBeCalledWith(fakeToken);
  });
  it('should throw NotFoundError when notificationToken does not exist', async () => {
    subscriptionRepository.load.mockResolvedValue(null);

    const promise = sut(params);

    await expect(promise).rejects.toThrow(
      new NotFoundError('notificationToken')
    );
  });

  it('should call HttpClient.request', async () => {
    await sut(params);
    expect(httpClient.request).toBeCalledTimes(1);
  });
  it('should return true on success', async () => {
    const response = await sut(params);
    expect(response).toBeTruthy();
  });
  it('should return false when HttpClient.request returns a status error', async () => {
    httpClient.request.mockResolvedValueOnce({
      statusCode: 400,
    });
    const response = await sut(params);
    expect(response).toBeFalsy();
  });
});
