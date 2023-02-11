import { Alarm } from '@/application/entities/alarm';
import { AlarmRepository } from '@/application/repositories/alarm-repository';
import { ChromeStorageAlarmMapper } from '../mappers/chrome-storage-alarm-mapper';

export class ChromeStorageAlarmRepository implements AlarmRepository {
  async save(alarm: Alarm): Promise<void> {
    const raw = ChromeStorageAlarmMapper.toChromeStorage(alarm);
    await chrome.storage.session.set({ [alarm.type]: raw });
  }
}
