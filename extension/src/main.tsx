import React from 'react';
import ReactDOM from 'react-dom/client';
import { MakeHome } from './presentation/modules/home/home-factory';
import './presentation/styles/index.css';
import 'firebase-commun-settings/config';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MakeHome />
  </React.StrictMode>
);
