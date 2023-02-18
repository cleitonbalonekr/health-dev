import { AlarmType } from '@/application/entities/alarm';
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
    const response = await sendNotification();
    console.log('response', response);
  }
});

const sendNotification = async (to?: string) => {
  try {
    const body = {
      to:
        to ||
        'c9j_yio-8rlgUW6-Wpi0Es:APA91bGJ0hyVFr_sGArPWoJJB0Gdeo7N0We0pitfSJvMPvVfGL5a_jzYeMtDYaxc-cYdAKKcOGLgbUG9wK4t4Vq9TzoUWDewlQuk_XdsZZVXrBMNCPWGNatSZxAEkNTJHCUZDTh-N9q4',
      notification: {
        title: 'FCM Message',
        body: 'This is a message from FCM',
        badge: '/badge-icon.png',
      },
    };
    const response = await self.fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        Authorization: `key=${FIREBASE_CONFIG.API_CLOUD_MESSAGE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
