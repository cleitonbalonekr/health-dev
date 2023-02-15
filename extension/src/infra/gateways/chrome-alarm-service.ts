import { Alarm, AlarmType } from '@/application/entities/alarm';
import { AlarmService } from '@/application/gateways/alarm-service';
import { AlarmRepository } from '@/application/repositories/alarm-repository';
import { ChromeStorageAlarmRepository } from '../database/chrome-storage/repositories/chrome-storage-alarm-repository';

export class ChromeAlarmService implements AlarmService {
  bookAlarm({ id, minutesRemaining, repeatEveryMinutes }: AlarmService.Input) {
    chrome.alarms.create(id, {
      delayInMinutes: minutesRemaining,
      periodInMinutes: repeatEveryMinutes,
    });
  }
}

let chromeStorageAlarmRepository: AlarmRepository | null = null;
const getAlarmRepositorySinglethon = () => {
  if (chromeStorageAlarmRepository) return chromeStorageAlarmRepository;
  return (chromeStorageAlarmRepository = new ChromeStorageAlarmRepository());
};

chrome.alarms.onAlarm.addListener(async (alarm) => {
  const storedAlarm = await getAlarmRepositorySinglethon().getByType(
    alarm.name as AlarmType.POMODORO
  );
  if (storedAlarm) {
    const notification = storedAlarm.notification;
    chrome.notifications.create(
      {
        type: 'basic',
        iconUrl: notification.iconUrl,
        title: notification.title,
        message: notification.description,
        silent: false,
      },
      () => {}
    );
  }
});
