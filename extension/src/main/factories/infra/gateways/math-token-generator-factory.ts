import { MathTokenGenerator } from '@/infra/gateways/math-token-generator';

export const makeMathTokenGenerator = () => {
  return new MathTokenGenerator();
};
