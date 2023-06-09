import { Preferences } from '@/application/entities/preferences';
import { PreferencesRepository } from '@/application/repositories/preferences-repository';
import { ChromeStoragePreferencesMapper } from '@/infra/database/chrome-storage/mappers/chrome-storage-preferences-mapper';
import { ChromeStoragePreferencesRepository } from '@/infra/database/chrome-storage/repositories/chrome-storage-preferences-repository';
import { chromeStub } from '../stubs/chrome-storage';

vi.stubGlobal('chrome', chromeStub);

const makePreferencesToChromeStorage = () => {
  const preferences = new Preferences({
    pomodoro: {
      timeToFocus: 25,
      timeToRest: 5,
    }
  });
  const value = ChromeStoragePreferencesMapper.toChromeStorage(preferences);
  return { preferences, value };
};

describe('ChromeStoragePreferencesRepository', () => {
  let sut: PreferencesRepository;
  const KEY = '@HeathDev:preferences';
  beforeEach(() => {
    sut = new ChromeStoragePreferencesRepository();
    vi.mocked(chrome.storage.local.get).mockImplementation(() => ({}));
  });
  describe('save', () => {
    it('should save a Preferences', async () => {
      const { preferences, value } = makePreferencesToChromeStorage();

      await sut.save(preferences);

      expect(chrome.storage.local.set).toBeCalledTimes(1);
      expect(chrome.storage.local.set).toHaveBeenCalledWith({
        [KEY]: value,
      });
    });
  });
  describe('load', () => {
    it('should return a token', async () => {
      const { value, preferences:preferencesStorage } = makePreferencesToChromeStorage();
      vi.mocked(chrome.storage.local.get).mockImplementationOnce(() => ({
        [KEY]: value,
      }));

      const preferences = await sut.load();

      expect(preferences).toBeTruthy();
      expect(preferences).toBeInstanceOf(Preferences);
      expect(preferences?.value).toEqual(preferencesStorage.value);
      expect(chrome.storage.local.get).toBeCalledTimes(1);
      expect(chrome.storage.local.get).toHaveBeenCalledWith(KEY);
    });
    it('should return a null', async () => {
      const preferences = await sut.load();

      expect(preferences).toBeNull();
    });
  });
});
