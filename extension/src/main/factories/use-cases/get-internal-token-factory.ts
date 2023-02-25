import { setupGetInternalToken } from '@/application/use-cases/get-internal-token';
import { makeChromeStorageTokenRepository } from '@/main/factories/infra/repositories/chrome-storage';
import { makeMathTokenGenerator } from '@/main/factories/infra/gateways';

export const makeGetInternalToken = () => {
  return setupGetInternalToken(
    makeMathTokenGenerator(),
    makeChromeStorageTokenRepository()
  );
};
