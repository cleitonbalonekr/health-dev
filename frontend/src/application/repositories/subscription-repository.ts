import { Subscription } from '@/application/entities/subscription';
import { ExternalToken } from '@/application/entities/external-token';

export interface SubscriptionRepository {
  save(subscription: Subscription): Promise<boolean>;
  load(externalToken: ExternalToken): Promise<string | null>;
}
