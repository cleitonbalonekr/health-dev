import { InternalToken } from '@/application/entities/internal-token';
import { TokenGenerator } from '@/application/gateways/token-generator';

type Input = {};

type Output = {
  internalToken: string;
};

export type GetInternalToken = (input: Input) => Promise<Output>;

type Setup = (tokenGenerator: TokenGenerator) => GetInternalToken;

export const setupGetInternalToken: Setup = (tokenGenerator) => async () => {
  const generatedToken = await tokenGenerator.generate();
  const internalToken = new InternalToken(generatedToken);
  return {
    internalToken: internalToken.value,
  };
};
