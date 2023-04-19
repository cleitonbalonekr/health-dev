import {
  setupEmulators,
  closeFirebase,
  cleanEmulators,
} from 'firebase-common-settings/tests/utils/firebase-emulator';
import { FirestoreInstance } from 'firebase-common-settings';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { SubscriptionRepository } from '@/application/repositories/subscription-repository';
import { FirebaseSubscriptionRepository } from '@/infra/database/firebase/firebase-subscription-repository';
import { InternalToken } from '@/application/entities/internal-token';

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
      const internalToken = new InternalToken('any_token');
      const response = await sut.save(internalToken);

      const storageData = await getDoc(getSubscriptionRef(internalToken.value));

      expect(storageData.id).toEqual(internalToken.value);
    });
  });
  describe('load', () => {
    it('should return notificationToken when find a token', async () => {
      const internalToken = 'any_internal_token';
      const notificationToken = 'any_notification_token';
      await setDoc(getSubscriptionRef(internalToken), {
        notificationToken,
      });
      const response = await sut.load(internalToken);
      expect(response).toEqual(notificationToken);
    });
    it('should return null when do not find a token', async () => {
      const internalToken = 'any_internal_token';
      const response = await sut.load(internalToken);
      expect(response).toBeNull();
    });
  });
});
