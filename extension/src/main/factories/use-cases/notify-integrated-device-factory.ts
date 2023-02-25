import { setupNotifyIntegratedDevice } from '@/application/use-cases/notify-integrated-device';
import { makeChromeStorageTokenRepository } from '@/main/factories/infra/repositories/chrome-storage';
import { makeFetchHttpClient } from '@/main/factories/infra/gateways/http/fetch-http-client';
import { makeFirebaseSubscriptionRepository } from '@/main/factories/infra/repositories/firebase';

export const makeNotifyIntegratedDevice = () => {
  return setupNotifyIntegratedDevice(
    makeFirebaseSubscriptionRepository(),
    makeChromeStorageTokenRepository(),
    makeFetchHttpClient()
  );
};
