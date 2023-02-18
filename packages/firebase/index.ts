import './config';
const env = (import.meta as any).env;

import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const messaging = getMessaging();
const vapidKey = env.VITE_FIREBASE_VAPID_KEY;
export const registerToken = (setToken: (value: string) => void) => {
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
    } else {
      console.log('Notification permission denied.');
    }
  });
  getToken(messaging, { vapidKey })
    .then((currentToken) => {
      if (currentToken) {
        setToken(currentToken);
        console.log('currentToken', currentToken);
        // Send the token to your server and update the UI if necessary
        // ...
      } else {
        // Show permission request UI
        console.log(
          'No registration token available. Request permission to generate one.'
        );
        // ...
      }
    })
    .catch((err) => {
      alert(err);
      console.log('An error occurred while retrieving token. ', err);
      // ...
    });
};

export const foregroundMessage = () => {
  const messaging = getMessaging();
  onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    // ...
  });
};
