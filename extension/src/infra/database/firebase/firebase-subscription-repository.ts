import { FirestoreInstance } from 'firebase-common-settings';
import {
  collection,
  CollectionReference,
  doc,
  getDoc,
} from 'firebase/firestore';
import { SubscriptionRepository } from '@/application/repositories/subscription-repository';

export class FirebaseSubscriptionRepository implements SubscriptionRepository {
  private subscriptionCollection: CollectionReference;
  constructor() {
    this.subscriptionCollection = collection(
      FirestoreInstance,
      'subscriptions'
    );
  }
  async load(externalToken: string): Promise<string | null> {
    const subscriptionDoc = doc(this.subscriptionCollection, externalToken);
    const subscription = await getDoc(subscriptionDoc);
    return subscription.exists() ? subscription.data().notificationToken : null;
  }
}
