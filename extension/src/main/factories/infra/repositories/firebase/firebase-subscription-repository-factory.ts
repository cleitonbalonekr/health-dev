import { FirebaseSubscriptionRepository } from '@/infra/database/firebase/firebase-subscription-repository';
export const makeFirebaseSubscriptionRepository = () => {
  return new FirebaseSubscriptionRepository();
};
