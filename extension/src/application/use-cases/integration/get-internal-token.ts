import { InternalToken } from '@/application/entities/internal-token';
import { TokenGenerator } from '@/application/gateways/token-generator';
import { SubscriptionRepository } from '@/application/repositories/subscription-repository';
import { TokenRepository } from '@/application/repositories/token-repository';

type Output = {
  internalToken: string;
};

export type GetInternalToken = () => Promise<Output>;

type Setup = (
  tokenGenerator: TokenGenerator,
  tokenRepository: TokenRepository,
  subscriptionRepository: SubscriptionRepository
) => GetInternalToken;

export const setupGetInternalToken: Setup =
  (tokenGenerator, tokenRepository, subscriptionRepository) => async () => {
    const existentToken = await tokenRepository.load();
    if (existentToken) {
      return {
        internalToken: existentToken.value,
      };
    }
    const generatedToken = await tokenGenerator.generate();
    const internalToken = new InternalToken(generatedToken);
    await tokenRepository.save(internalToken);
    await subscriptionRepository.save(internalToken);
    return {
      internalToken: internalToken.value,
    };
  };
