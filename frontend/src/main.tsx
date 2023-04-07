import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/presentation/styles/index.css'; // make sure the path.
import { router } from '@/main/routes';
import { firebaseConfig } from 'firebase-common-settings';
import { RouterProvider } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
if ('serviceWorker' in navigator) {
  const config = encodeURIComponent(JSON.stringify(firebaseConfig));
  const isProduction = import.meta.env.PROD;
  const productionSWUrl = './firebase-messaging-sw.js';
  const developmentSWUrl = '../public/firebase-messaging-sw.js';

  const swUrl = isProduction
    ? `${productionSWUrl}?${config}`
    : `${developmentSWUrl}?${config}`;
  navigator.serviceWorker
    .register(swUrl)
    .then(function (registration) {
      console.log('Registration successful, scope is:', registration.scope);
    })
    .catch(function (err) {
      console.log('Service worker registration failed, error:', err);
    });
}
