import axios from 'axios';
import { deleteApp } from 'firebase/app';
import { connectFirestoreEmulator } from 'firebase/firestore';
import app, { FirestoreInstance } from '../../config';

export function setupEmulators() {
  connectFirestoreEmulator(FirestoreInstance, 'localhost', 8080);
  return 'ok';
}
export async function closeFirebase() {
  await deleteApp(app);
}
export async function cleanEmulators() {
  const firestoreUrl =
    'http://127.0.0.1:8080/emulator/v1/projects/lifeconn-4d4ff/databases/(default)/documents';
  const headers = {
    Authorization: 'Bearer owner',
  };
  await axios.delete(firestoreUrl, {
    headers,
  });

  return 'ok';
}
