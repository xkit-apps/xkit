import { Navigate, RouteObject } from 'react-router-dom';
import Search from '@/pages/search';
import Tray from '@/pages/tray';
import Onboarding from '@/pages/onboarding';

export const routeConfig: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to={'/search'} />,
  },
  {
    path: '/search',
    element: <Search />,
  },
  {
    path: '/tray',
    element: <Tray />,
  },
  {
    path: '/onboarding',
    element: <Onboarding />,
  },
];
