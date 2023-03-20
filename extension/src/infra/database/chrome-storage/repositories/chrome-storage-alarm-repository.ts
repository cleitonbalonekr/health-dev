import { Alarm, AlarmType } from '@/application/entities/alarm';
import { AlarmRepository } from '@/application/repositories/alarm-repository';
import { ChromeStorageAlarmMapper } from '../mappers/chrome-storage-alarm-mapper';

export class ChromeStorageAlarmRepository implements AlarmRepository {
  async getByType(type: AlarmType): Promise<Alarm | null> {
    const raw = await chrome.storage.local.get(type);
    if (!raw[type]) return null;
    return ChromeStorageAlarmMapper.toAlarm(raw[type]);
  }

  async save(alarm: Alarm): Promise<void> {
    const raw = ChromeStorageAlarmMapper.toChromeStorage(alarm);
    await chrome.storage.local.set({ [alarm.type]: raw });
  }

  async remove(type: AlarmType): Promise<void> {
    await chrome.storage.local.remove(type);
  }
}
