export interface SubscriptionRepository {
  load(externalToken: string): Promise<string | null>;
}
