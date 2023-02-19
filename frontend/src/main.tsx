import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // make sure the path.
import App from './App';
import { firebaseConfig } from 'firebase/config';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
if ('serviceWorker' in navigator) {
  const config = encodeURIComponent(JSON.stringify(firebaseConfig));
  const swUrl = `../public/firebase-messaging-sw.js?${config}`;
  navigator.serviceWorker
    .register(swUrl)
    .then(function (registration) {
      console.log('Registration successful, scope is:', registration.scope);
    })
    .catch(function (err) {
      console.log('Service worker registration failed, error:', err);
    });
}
