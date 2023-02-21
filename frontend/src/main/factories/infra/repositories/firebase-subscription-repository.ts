import { FirebaseSubscriptionRepository } from '@/infra/database/firebase/repositories/firebase-subscription-repository';

export const makeFirebaseSubscriptionRepository = () => {
  return new FirebaseSubscriptionRepository();
};
