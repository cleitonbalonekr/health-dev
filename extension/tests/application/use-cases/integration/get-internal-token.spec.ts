import { InternalToken } from '@/application/entities/internal-token';
import { TokenGenerator } from '@/application/gateways/token-generator';
import { SubscriptionRepository } from '@/application/repositories/subscription-repository';
import { TokenRepository } from '@/application/repositories/token-repository';
import {
  setupGetInternalToken,
  GetInternalToken,
} from '@/application/use-cases/integration';
import { mock, MockProxy, mockReset } from 'vitest-mock-extended';
describe('GetInternalToken', () => {
  let sut: GetInternalToken;
  let tokenGenerator: MockProxy<TokenGenerator>;
  let tokenRepository: MockProxy<TokenRepository>;
  let subscriptionRepository: MockProxy<SubscriptionRepository>;
  const fakeToken = 'valid_token';
  beforeAll(() => {
    tokenGenerator = mock();
    tokenRepository = mock();
    subscriptionRepository = mock();
  });
  beforeEach(() => {
    mockReset(tokenRepository);
    mockReset(tokenGenerator);
    mockReset(subscriptionRepository);
    tokenGenerator.generate.mockResolvedValue(fakeToken);
    sut = setupGetInternalToken(
      tokenGenerator,
      tokenRepository,
      subscriptionRepository
    );
  });

  it('should call TokenGenerator.generate', async () => {
    await sut();
    expect(tokenGenerator.generate).toBeCalledTimes(1);
    expect(tokenGenerator.generate).toBeCalledWith();
  });

  it('should call TokenRepository.save', async () => {
    await sut();
    expect(tokenRepository.save).toBeCalledTimes(1);

    expect(tokenRepository.save).toBeCalledWith(new InternalToken(fakeToken));
  });
  it('should call SubscriptionRepository.save', async () => {
    await sut();
    expect(subscriptionRepository.save).toBeCalledTimes(1);

    expect(subscriptionRepository.save).toBeCalledWith(
      new InternalToken(fakeToken)
    );
  });

  it('should return a token', async () => {
    const response = await sut();
    expect(response).toEqual({
      internalToken: fakeToken,
    });
  });

  it('should call TokenRepository.load', async () => {
    await sut();
    expect(tokenRepository.load).toBeCalledTimes(1);
    expect(tokenRepository.load).toBeCalledWith();
  });
  it('should return an existent token when found', async () => {
    const foundedToken = 'founded_token';
    tokenRepository.load.mockResolvedValueOnce(new InternalToken(foundedToken));
    const response = await sut();
    expect(response).toEqual({
      internalToken: foundedToken,
    });
  });
});
