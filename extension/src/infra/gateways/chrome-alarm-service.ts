import { AlarmType } from '@/application/entities/alarm';
import { Notification } from '@/application/entities/notification';
import { AlarmService } from '@/application/gateways/alarm-service';
import { makeNotifyIntegratedDevice } from '@/main/factories/use-cases/integration';
import { makeChromeStorageAlarmRepository } from '@/main/factories/infra/repositories/chrome-storage';

export class ChromeAlarmService implements AlarmService {
  bookAlarm({ id, minutesRemaining, repeatEveryMinutes }: AlarmService.Input) {
    chrome.alarms.create(id, {
      delayInMinutes: minutesRemaining,
      periodInMinutes: repeatEveryMinutes,
    });
  }

  stopAlarm(name: string): void {
    chrome.alarms.clear(name);
  }
}

chrome?.alarms?.onAlarm.addListener(async (alarm) => {
  const storedAlarm = await makeChromeStorageAlarmRepository().getByType(
    alarm.name as AlarmType
  );
  if (!storedAlarm) {
    return;
  }
  const notification = storedAlarm.notification;
  sendLocalNotification(notification);
  if (alarm.name === AlarmType.POMODORO) {
    await sendNotificationToIntegratedDevices(
      notification.title,
      notification.description
    );
  }
});

const sendLocalNotification = (notification: Notification) => {
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
};

const sendNotificationToIntegratedDevices = async (
  title: string,
  description: string
) => {
  try {
    const notifyIntegratedDevice = makeNotifyIntegratedDevice();
    const response = await notifyIntegratedDevice({
      title,
      description,
    });
    console.log('response notification', response);
  } catch (error) {
    console.log(error);
  }
};
