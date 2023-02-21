import {
  setupEmulators,
  closeFirebase,
  cleanEmulators,
} from 'firebase-commun-settings/tests/utils/firebase-emulator';
import { makeSubscription } from '@/tests/application/factories/subscription-factory';
import { SubscriptionRepository } from '@/application/respositories/subscription-repository';
import { FirebaseSubscriptionRepository } from '@/infra/database/firebase/repositories/firebase-subscription-repository';

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
      expect(response).toBeTruthy();
    });
  });
});
