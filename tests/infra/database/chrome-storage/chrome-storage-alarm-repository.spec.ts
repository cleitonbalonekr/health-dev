import { makeAlarm } from '@/../tests/application/factories/alarm-factory';
import { AlarmRepository } from '@/application/repositories/alarm-repository';
import { ChromeStorageAlarmMapper } from '@/infra/database/chrome-storage/mappers/chrome-storage-alarm-mapper';
import { ChromeStorageAlarmRepository } from '@/infra/database/chrome-storage/repositories/chrome-storage-alarm-repository';
import { chromeStub } from '../stubs/chrome-storage';

vi.stubGlobal('chrome', chromeStub);

const makeAlarmToChromeStorage = () => {
  const Alarm = makeAlarm();
  const value = ChromeStorageAlarmMapper.toChromeStorage(Alarm);
  return { Alarm, value };
};

describe('ChromeStorageAlarmRepository', () => {
  let sut: AlarmRepository;

  beforeEach(() => {
    vitest.restoreAllMocks();
    sut = new ChromeStorageAlarmRepository();
    vi.mocked(chrome.storage.session.get).mockImplementation(() => ({}));
  });
  describe('save', () => {
    it('should save a Alarm', async () => {
      const { Alarm, value } = makeAlarmToChromeStorage();

      await sut.save(Alarm);

      expect(chrome.storage.session.set).toBeCalledTimes(1);
      expect(chrome.storage.session.set).toHaveBeenLastCalledWith({
        [Alarm.type]: value,
      });
    });
  });
});
