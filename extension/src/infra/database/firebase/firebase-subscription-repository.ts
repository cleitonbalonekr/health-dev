import { FirestoreInstance } from 'firebase-common-settings';
import {
  collection,
  CollectionReference,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { SubscriptionRepository } from '@/application/repositories/subscription-repository';
import { InternalToken } from '@/application/entities/internal-token';

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

  async save(externalToken: InternalToken): Promise<void> {
    const subscriptionDoc = doc(
      this.subscriptionCollection,
      externalToken.value
    );
    await setDoc(subscriptionDoc, {});
  }
}
