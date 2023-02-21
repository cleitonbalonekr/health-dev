import './config';
const env = (import.meta as any).env;

import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const messaging = getMessaging();

const vapidKey = env.VITE_FIREBASE_VAPID_KEY;

export const registerToken = async () => {
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
    } else {
      console.log('Notification permission denied.');
    }
  });
  const response = await getToken(messaging, { vapidKey });
  return response;
};

export const foregroundMessage = () => {
  const messaging = getMessaging();
  onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    // ...
  });
};
