import { Alarm } from '@/application/entities/alarm';
import { Notification } from '@/application/entities/notification';

export class ChromeStorageAlarmMapper {
  static toChromeStorage(alarm: Alarm) {
    return JSON.stringify({
      notification: alarm.notification,
      type: alarm.type,
      booksAt: alarm.booksAt,
      repeatEveryMinutes: alarm.repeatEveryMinutes,
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
