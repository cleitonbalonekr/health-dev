import { AlarmType } from '@/application/entities/alarm';
import { AlarmService } from '@/application/gateways/alarm-service';
import { AlarmRepository } from '@/application/repositories/alarm-repository';
import { makeNotifyIntegratedDevice } from '@/main/factories/use-cases/notify-integrated-device-factory';
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
const getAlarmRepositorySingleton = () => {
  if (chromeStorageAlarmRepository) return chromeStorageAlarmRepository;
  return (chromeStorageAlarmRepository = new ChromeStorageAlarmRepository());
};

chrome.alarms.onAlarm.addListener(async (alarm) => {
  const storedAlarm = await getAlarmRepositorySingleton().getByType(
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
    const response = await sendNotification(
      notification.title,
      notification.description
    );
    console.log('response', response);
  }
});

const sendNotification = async (title: string, description: string) => {
  try {
    const notifyIntegratedDevice = makeNotifyIntegratedDevice();
    const response = await notifyIntegratedDevice({
      title,
      description,
    });
    console.log('response', response);
  } catch (error) {
    console.log(error);
  }
};
