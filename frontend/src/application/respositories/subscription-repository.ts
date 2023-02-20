import { Subscription } from '@/application/entities/subscription';

export interface SubscriptionRepository {
  save(subscription: Subscription): Promise<boolean>;
}
