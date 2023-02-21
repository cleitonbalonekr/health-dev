import { Subscription } from '@/application/entities/subscription';

export class FirebaseSubscriptionMapper {
  static toFirebase(subscription: Subscription) {
    return {
      externalToken: subscription.externalToken.value,
      notificationToken: subscription.notificationToken,
    };
  }
}
