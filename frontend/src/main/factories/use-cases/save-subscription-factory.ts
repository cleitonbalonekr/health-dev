import { setupSaveSubscription } from '@/application/use-cases/save-subscription';
import { makeFirebaseSubscriptionRepository } from '../infra/repositories';

export const makeSaveSubscription = () => {
  return setupSaveSubscription(makeFirebaseSubscriptionRepository());
};
