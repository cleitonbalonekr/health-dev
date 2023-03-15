import { InternalToken } from '@/application/entities/internal-token';
import { WaterReminderRepository } from '@/application/repositories/water-reminder-repository';
import { ChromeStorageWaterReminderRepository } from '@/infra/database/chrome-storage/repositories/chrome-storage-water-reminder-repository';
import { chromeStub } from '../stubs/chrome-storage';

vi.stubGlobal('chrome', chromeStub);

describe('ChromeStorageWaterReminderRepository', () => {
  let sut: WaterReminderRepository;
  const KEY = '@HeathDev:WaterReminder';
  beforeEach(() => {
    sut = new ChromeStorageWaterReminderRepository();
    vi.mocked(chrome.storage.local.get).mockImplementation(() => ({}));
  });
  describe('save', () => {
    it('should save a waterQuantity', async () => {
      const waterQuantity = 2.3;

      await sut.save(waterQuantity);

      expect(chrome.storage.local.set).toBeCalledTimes(1);
      expect(chrome.storage.local.set).toHaveBeenCalledWith({
        [KEY]: waterQuantity,
      });
    });
  });
  describe('load', () => {
    it('should return a waterQuantity', async () => {
      const waterQuantity = 2.3;

      vi.mocked(chrome.storage.local.get).mockImplementationOnce(() => ({
        [KEY]: waterQuantity,
      }));

      const response = await sut.load();

      expect(response).toBeTruthy();
      expect(response).toEqual(waterQuantity);
      expect(chrome.storage.local.get).toBeCalledTimes(1);
      expect(chrome.storage.local.get).toHaveBeenCalledWith(KEY);
    });
    it('should return a null', async () => {
      const response = await sut.load();

      expect(response).toBeNull();
    });
  });
});
