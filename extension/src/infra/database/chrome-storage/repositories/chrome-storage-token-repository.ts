import { InternalToken } from '@/application/entities/internal-token';
import { TokenRepository } from '@/application/repositories/token-repository';
import { ChromeStorageTokenMapper } from '../mappers/chrome-storage-token-mapper';

export class ChromeStorageTokenRepository implements TokenRepository {
  private key: string = '@HeathDev:InternalToken';

  async load(): Promise<InternalToken | null> {
    const raw = await chrome.storage.local.get(this.key);
    if (!raw[this.key]) return null;
    return ChromeStorageTokenMapper.toInternalToken(raw[this.key]);
  }

  async save(internalToken: InternalToken): Promise<void> {
    const raw = ChromeStorageTokenMapper.toChromeStorage(internalToken);
    await chrome.storage.local.set({ [this.key]: raw });
  }
}
