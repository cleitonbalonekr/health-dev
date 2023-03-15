import { WaterGoal } from '@/application/entities/water-goal';
import { WaterReminderRepository } from '@/application/repositories/water-reminder-repository';
import { ChromeStorageWaterReminderMapper } from '@/infra/database/chrome-storage/mappers/chrome-storage-water-reminder-mapper';
import { ChromeStorageWaterReminderRepository } from '@/infra/database/chrome-storage/repositories/chrome-storage-water-reminder-repository';
import { chromeStub } from '../stubs/chrome-storage';

vi.stubGlobal('chrome', chromeStub);

const makeWaterGoalToChromeStorage = () => {
  const waterGoal = new WaterGoal(2.3);
  const value = ChromeStorageWaterReminderMapper.toChromeStorage(waterGoal);
  return { waterGoal, value };
};

describe('ChromeStorageWaterReminderRepository', () => {
  let sut: WaterReminderRepository;
  const KEY = '@HeathDev:WaterReminder';
  beforeEach(() => {
    sut = new ChromeStorageWaterReminderRepository();
    vi.mocked(chrome.storage.local.get).mockImplementation(() => ({}));
  });
  describe('save', () => {
    it('should save a waterQuantity', async () => {
      const { waterGoal, value } = makeWaterGoalToChromeStorage();

      await sut.save(waterGoal);

      expect(chrome.storage.local.set).toBeCalledTimes(1);
      expect(chrome.storage.local.set).toHaveBeenCalledWith({
        [KEY]: value,
      });
    });
  });
  describe('load', () => {
    it('should return a waterQuantity', async () => {
      const { waterGoal, value } = makeWaterGoalToChromeStorage();

      vi.mocked(chrome.storage.local.get).mockImplementationOnce(() => ({
        [KEY]: value,
      }));

      const response = await sut.load();

      expect(response).toBeTruthy();
      expect(response).toBeInstanceOf(WaterGoal);
      expect(response).toEqual(waterGoal);
      expect(chrome.storage.local.get).toBeCalledTimes(1);
      expect(chrome.storage.local.get).toHaveBeenCalledWith(KEY);
    });
    it('should return a null', async () => {
      const response = await sut.load();

      expect(response).toBeNull();
    });
  });
});
