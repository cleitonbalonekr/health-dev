import { FirestoreInstance } from 'firebase-common-settings';
import {
  collection,
  CollectionReference,
  doc,
  getDoc,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import { Subscription } from '@/application/entities/subscription';
import { SubscriptionRepository } from '@/application/repositories/subscription-repository';
import { FirebaseSubscriptionMapper } from '../mappers/firebase-subscription-mapper';
import { ExternalToken } from '@/application/entities/external-token';

export class FirebaseSubscriptionRepository implements SubscriptionRepository {
  private subscriptionCollection: CollectionReference;
  constructor() {
    this.subscriptionCollection = collection(
      FirestoreInstance,
      'subscriptions'
    );
  }

  async save(subscription: Subscription): Promise<boolean> {
    const { externalToken, notificationToken } =
      FirebaseSubscriptionMapper.toFirebase(subscription);

    const subscriptionRef = doc(this.subscriptionCollection, externalToken);

    await setDoc(subscriptionRef, {
      notificationToken,
      externalToken,
      createdAt: Timestamp.fromDate(new Date()),
    });

    return true;
  }
  async verifyToken(externalToken: ExternalToken): Promise<boolean> {
    const subscriptionDoc = doc(
      this.subscriptionCollection,
      externalToken.value
    );
    const subscription = await getDoc(subscriptionDoc);
    return subscription.exists();
  }
}
