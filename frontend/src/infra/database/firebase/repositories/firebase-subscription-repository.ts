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
import { SubscriptionRepository } from '@/application/respositories/subscription-repository';
import { FirebaseSubscriptionMapper } from '../mappers/firebase-subscription-mapper';

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
    const fireabseSubscriptionEntity = await getDoc(subscriptionRef);
    if (!fireabseSubscriptionEntity.exists()) {
      // return false;
    }
    await setDoc(subscriptionRef, {
      notificationToken,
      externalToken,
      createdAt: Timestamp.fromDate(new Date()),
    });

    return true;
  }
}
