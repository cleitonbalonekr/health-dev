import { Alarm } from '@/application/entities/alarm';

export class ChromeStorageAlarmMapper {
  static toChromeStorage(alarm: Alarm) {
    return JSON.stringify({
      notification: alarm.notification,
      type: alarm.type,
      booksAt: alarm.booksAt,
    });
  }
  static toAlarm(raw: any) {
    const jsonRaw = JSON.parse(raw);
    return new Alarm({
      ...jsonRaw,
      booksAt: new Date(jsonRaw.booksAt),
    });
  }
}
