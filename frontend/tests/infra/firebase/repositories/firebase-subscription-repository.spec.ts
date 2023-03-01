import {
  setupEmulators,
  closeFirebase,
  cleanEmulators,
} from 'firebase-common-settings/tests/utils/firebase-emulator';
import { FirestoreInstance } from 'firebase-common-settings';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { makeSubscription } from '@/tests/application/factories/subscription-factory';
import { SubscriptionRepository } from '@/application/repositories/subscription-repository';
import { FirebaseSubscriptionRepository } from '@/infra/database/firebase/repositories/firebase-subscription-repository';

const makeSubscriptionCollection = () => {
  return collection(FirestoreInstance, 'subscriptions');
};
const getSubscriptionRef = (id: string) => {
  return doc(makeSubscriptionCollection(), id);
};

describe('FirebaseSubscriptionRepository', () => {
  let sut: SubscriptionRepository;
  beforeAll(() => {
    setupEmulators();
  });
  beforeEach(async () => {
    await cleanEmulators();
    sut = new FirebaseSubscriptionRepository();
  });
  afterAll(async () => {
    await closeFirebase();
  });

  describe('save', () => {
    it('should create a subscription', async () => {
      const subscription = makeSubscription();
      const response = await sut.save(subscription);

      const storageData = await getDoc(
        getSubscriptionRef(subscription.externalToken.value)
      );

      expect(storageData.data()).toMatchObject({
        notificationToken: subscription.notificationToken,
        externalToken: subscription.externalToken.value,
      });
      expect(storageData.id).toEqual(subscription.externalToken.value);
      expect(response).toBeTruthy();
    });
  });
  describe('load', () => {
    it('should return notificationToken when find a token', async () => {
      const subscription = makeSubscription();
      await setDoc(getSubscriptionRef(subscription.externalToken.value), {
        notificationToken: subscription.notificationToken,
      });
      const response = await sut.load(subscription.externalToken);
      expect(response).toEqual(subscription.notificationToken);
    });
    it('should return null when do not find a token', async () => {
      const subscription = makeSubscription();

      const response = await sut.load(subscription.externalToken);
      expect(response).toBeNull();
    });
  });
});
