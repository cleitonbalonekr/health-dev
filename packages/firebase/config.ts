import { initializeApp } from 'firebase/app';
import * as firestore from 'firebase/firestore';
import { getMessaging } from 'firebase/messaging';
const env = (import.meta as any).env;
export const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const FirestoreInstance = firestore.getFirestore(app);
export const messaging = getMessaging(app);
export default app;
