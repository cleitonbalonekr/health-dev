import {
  createRoutesFromElements,
  // createBrowserRouter,
  createHashRouter,
  Route,
} from 'react-router-dom';

import Home from '@/presentation/modules/home';
import ErrorPage from '@/presentation/modules/error';
import { makeRegistration } from '../factories/pages/registration-factory';

export const router = createHashRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />}>
      <Route index element={<Home />} />
      <Route path="subscribe/:extensionId" element={makeRegistration()} />
    </Route>
  )
);
