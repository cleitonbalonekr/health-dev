import { InternalToken } from '@/application/entities/internal-token';

export interface SubscriptionRepository {
  load(externalToken: string): Promise<string | null>;
  save(externalToken: InternalToken): Promise<void>;
}
