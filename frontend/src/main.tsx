import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/presentation/styles/index.css'; // make sure the path.
import { router } from '@/presentation/routes';
import { firebaseConfig } from 'firebase-commun-settings/config';
import { RouterProvider } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
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
