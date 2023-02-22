import {
  createRoutesFromElements,
  Route,
  createMemoryRouter,
} from 'react-router-dom';
import { makeHome, makeSettings } from '@/main/factories/pages';
import ErrorPage from '@/presentation/modules/error';

export const router = createMemoryRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />}>
      <Route index element={makeHome()} />
      <Route path="settings" element={makeSettings()} />
    </Route>
  )
);
