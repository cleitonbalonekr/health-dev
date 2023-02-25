import { InternalToken } from '@/application/entities/internal-token';
import { TokenRepository } from '@/application/repositories/token-repository';
import { ChromeStorageTokenMapper } from '@/infra/database/chrome-storage/mappers/chrome-storage-token-mapper';
import { ChromeStorageTokenRepository } from '@/infra/database/chrome-storage/repositories/chrome-storage-token-repository';
import { chromeStub } from '../stubs/chrome-storage';

vi.stubGlobal('chrome', chromeStub);

const makeInternalTokenToChromeStorage = () => {
  const internalToken = new InternalToken('valid_token');
  const value = ChromeStorageTokenMapper.toChromeStorage(internalToken);
  return { internalToken, value };
};

describe('ChromeStorageTokenRepository', () => {
  let sut: TokenRepository;
  const KEY = '@HeathDev:InternalToken';
  beforeEach(() => {
    sut = new ChromeStorageTokenRepository();
    vi.mocked(chrome.storage.local.get).mockImplementation(() => ({}));
  });
  describe('save', () => {
    it('should save a InternalToken', async () => {
      const { internalToken, value } = makeInternalTokenToChromeStorage();

      await sut.save(internalToken);

      expect(chrome.storage.local.set).toBeCalledTimes(1);
      expect(chrome.storage.local.set).toHaveBeenCalledWith({
        [KEY]: value,
      });
    });
  });
  describe('load', () => {
    it('should return a token', async () => {
      const { value } = makeInternalTokenToChromeStorage();
      vi.mocked(chrome.storage.local.get).mockImplementationOnce(() => ({
        [KEY]: value,
      }));

      const internalToken = await sut.load();

      expect(internalToken).toBeTruthy();
      expect(internalToken).toBeInstanceOf(InternalToken);
      expect(internalToken?.value).toEqual(value);
      expect(chrome.storage.local.get).toBeCalledTimes(1);
      expect(chrome.storage.local.get).toHaveBeenCalledWith(KEY);
    });
    it('should return a null', async () => {
      const internalToken = await sut.load();

      expect(internalToken).toBeNull();
    });
  });
});
