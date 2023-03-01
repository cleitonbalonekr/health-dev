import { setupVerifyExternalToken } from '@/application/use-cases/verify-external-token';
import { makeFirebaseSubscriptionRepository } from '../infra/repositories';

export const makeVerifyExternalToken = () => {
  return setupVerifyExternalToken(makeFirebaseSubscriptionRepository());
};
