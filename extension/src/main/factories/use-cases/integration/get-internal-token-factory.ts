import { setupGetInternalToken } from '@/application/use-cases/integration/get-internal-token';
import { makeChromeStorageTokenRepository } from '@/main/factories/infra/repositories/chrome-storage';
import { makeMathTokenGenerator } from '@/main/factories/infra/gateways';
import { makeFirebaseSubscriptionRepository } from '@/main/factories/infra/repositories/firebase';

export const makeGetInternalToken = () => {
  return setupGetInternalToken(
    makeMathTokenGenerator(),
    makeChromeStorageTokenRepository(),
    makeFirebaseSubscriptionRepository()
  );
};
