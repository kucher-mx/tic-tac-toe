// pages
import { NotFoundPage } from '../../pages/404/404';
import { MainScreen } from '../../pages/main-screen/main-screen';
import { ProfileScreen } from '../../pages/profile/profile';
import { RatingScreen } from '../../pages/rating/rating';

export const MAIN_PAGE_ROUTE = '/';
export const PROFILE_PAGE_ROUTE = '/profile';
export const RATING_PAGE_ROUTE = '/rating';

export const routes = [
  {
    path: '/',
    element: <MainScreen />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/profile',
    element: <ProfileScreen />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/rating',
    element: <RatingScreen />,
    errorElement: <NotFoundPage />,
  },
];
