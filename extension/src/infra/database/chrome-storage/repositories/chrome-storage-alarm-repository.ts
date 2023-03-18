import { Alarm, AlarmType } from '@/application/entities/alarm';
import { AlarmRepository } from '@/application/repositories/alarm-repository';
import { ChromeStorageAlarmMapper } from '../mappers/chrome-storage-alarm-mapper';

export class ChromeStorageAlarmRepository implements AlarmRepository {
  remove(type: AlarmType): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async save(alarm: Alarm): Promise<void> {
    const raw = ChromeStorageAlarmMapper.toChromeStorage(alarm);
    await chrome.storage.session.set({ [alarm.type]: raw });
  }

  async getByType(type: AlarmType): Promise<Alarm | null> {
    const raw = await chrome.storage.session.get(type);
    if (!raw[type]) return null;
    return ChromeStorageAlarmMapper.toAlarm(raw[type]);
  }
}
