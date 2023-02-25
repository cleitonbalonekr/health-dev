import { InternalToken } from '@/application/entities/internal-token';

export interface TokenRepository {
  save(internalToken: InternalToken): Promise<void>;
  load(): Promise<InternalToken | null>;
}
