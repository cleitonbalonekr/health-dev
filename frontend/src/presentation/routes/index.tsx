import React from 'react';
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from 'react-router-dom';

import Home from '@/presentation/modules/home';
import Registration from '@/presentation/modules/registration';
import ErrorPage from '../modules/error';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />}>
      <Route index element={<Home />} />
      <Route path="subscribe/:extensionId" element={<Registration />} />
    </Route>
  )
);
