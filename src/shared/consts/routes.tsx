import { NotFoundPage } from '../../pages/404/404';
import { MainScreen } from '../../pages/main-screen/main-screen';

export const routes = [
  {
    path: '/',
    element: <MainScreen />,
    errorElement: <NotFoundPage />,
  },
];
