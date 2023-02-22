import {
  createRoutesFromElements,
  Route,
  createMemoryRouter,
} from 'react-router-dom';
import { makeHome } from '@/main/factories/pages/home-factory';
import ErrorPage from '@/presentation/modules/error';

export const router = createMemoryRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />}>
      <Route index element={makeHome()} />
      {/* <Route path="subscribe/:extensionId" element={makeRegistration()} /> */}
    </Route>
  )
);
