import { Preferences } from '@/application/entities/preferences';
import { PreferencesRepository } from '@/application/repositories/preferences-repository';
import { ChromeStoragePreferencesMapper } from '@/infra/database/chrome-storage/mappers/chrome-storage-preferences-mapper';

export class ChromeStoragePreferencesRepository implements PreferencesRepository {
  private key: string = '@HeathDev:preferences';

  async load(): Promise<Preferences | null> {
    const raw = await chrome.storage.local.get(this.key);
    if (!raw[this.key]) return null;
    return ChromeStoragePreferencesMapper.toPreferences(raw[this.key]);
  }

  async save(preferences: Preferences): Promise<void> {
    const raw = ChromeStoragePreferencesMapper.toChromeStorage(preferences);
    await chrome.storage.local.set({ [this.key]: raw });
  }
}
