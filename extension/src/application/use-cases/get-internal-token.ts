import { InternalToken } from '@/application/entities/internal-token';
import { TokenGenerator } from '@/application/gateways/token-generator';
import { TokenRepository } from '@/application/repositories/token-repository';

type Output = {
  internalToken: string;
};

export type GetInternalToken = () => Promise<Output>;

type Setup = (
  tokenGenerator: TokenGenerator,
  tokenRepository: TokenRepository
) => GetInternalToken;

export const setupGetInternalToken: Setup =
  (tokenGenerator, tokenRepository) => async () => {
    await tokenRepository.load();
    const generatedToken = await tokenGenerator.generate();
    const internalToken = new InternalToken(generatedToken);
    await tokenRepository.save(internalToken);
    return {
      internalToken: internalToken.value,
    };
  };
