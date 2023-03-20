import { makeAlarm } from '@/../tests/application/factories/alarm-factory';
import { AlarmType } from '@/application/entities/alarm';
import { AlarmRepository } from '@/application/repositories/alarm-repository';
import { ChromeStorageAlarmMapper } from '@/infra/database/chrome-storage/mappers/chrome-storage-alarm-mapper';
import { ChromeStorageAlarmRepository } from '@/infra/database/chrome-storage/repositories/chrome-storage-alarm-repository';
import { chromeStub } from '../stubs/chrome-storage';

vi.stubGlobal('chrome', chromeStub);

const makeAlarmToChromeStorage = () => {
  const alarm = makeAlarm();
  const value = ChromeStorageAlarmMapper.toChromeStorage(alarm);
  return { alarm, value };
};

describe('ChromeStorageAlarmRepository', () => {
  let sut: AlarmRepository;

  beforeEach(() => {
    sut = new ChromeStorageAlarmRepository();
    vi.mocked(chrome.storage.session.get).mockImplementation(() => ({}));
  });
  describe('save', () => {
    it('should save an Alarm', async () => {
      const { alarm, value } = makeAlarmToChromeStorage();

      await sut.save(alarm);

      expect(chrome.storage.session.set).toBeCalledTimes(1);
      expect(chrome.storage.session.set).toHaveBeenLastCalledWith({
        [alarm.type]: value,
      });
    });
  });
  describe('getByType', () => {
    it('should get an alarm by type and return it', async () => {
      const { alarm, value } = makeAlarmToChromeStorage();
      vi.mocked(chrome.storage.session.get).mockImplementationOnce(() => ({
        [alarm.type]: value,
      }));

      const openAlarm = await sut.getByType(alarm.type);
      expect(chrome.storage.session.get).toBeCalledTimes(1);
      expect(chrome.storage.session.get).toHaveBeenLastCalledWith(alarm.type);
      expect(openAlarm).toEqual(alarm);
    });
    it('should return null when does not exist a open pomodoro', async () => {
      const openAlarm = await sut.getByType(AlarmType.POMODORO);

      expect(openAlarm).toBeNull();
    });
  });
  describe('remove', () => {
    it('should remove an Alarm', async () => {
      const { alarm } = makeAlarmToChromeStorage();

      await sut.remove(alarm.type);

      expect(chrome.storage.session.remove).toBeCalledTimes(1);
      expect(chrome.storage.session.remove).toHaveBeenLastCalledWith(
        alarm.type
      );
    });
  });
});
