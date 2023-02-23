import { AlarmType } from '@/application/entities/alarm';
import { AlarmService } from '@/application/gateways/alarm-service';
import { AlarmRepository } from '@/application/repositories/alarm-repository';
import { SubscriptionRepository } from '@/application/repositories/subscription-repository';
import { ChromeStorageAlarmRepository } from '../database/chrome-storage/repositories/chrome-storage-alarm-repository';
import { FirebaseSubscriptionRepository } from '../database/firebase/firebase-subscription-repository';

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
let firebaseSubscriptionRepository: SubscriptionRepository | null = null;
const getFirebaseSubscriptionRepositorySingleton = () => {
  if (firebaseSubscriptionRepository) return firebaseSubscriptionRepository;
  return (firebaseSubscriptionRepository =
    new FirebaseSubscriptionRepository());
};

// chrome.alarms.onAlarm.addListener(async (alarm) => {
//   const storedAlarm = await getAlarmRepositorySingleton().getByType(
//     alarm.name as AlarmType.POMODORO
//   );
//   if (storedAlarm) {
//     const notification = storedAlarm.notification;
//     chrome.notifications.create(
//       {
//         type: 'basic',
//         iconUrl: notification.iconUrl,
//         title: notification.title,
//         message: notification.description,
//         silent: false,
//       },
//       () => {}
//     );
//     const response = await sendNotification();
//     console.log('response', response);
//   }
// });

const sendNotification = async (to?: string) => {
  try {
    const notificationToken =
      await getFirebaseSubscriptionRepositorySingleton().load('cleiton');
    console.log('notificationToken', notificationToken);
    if (!notificationToken) return;
    const body = {
      to: notificationToken,
      notification: {
        title: 'FCM Message',
        body: 'This is a message from FCM',
        // badge: '/badge-icon.png',
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
