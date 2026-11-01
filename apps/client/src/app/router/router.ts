import { createBrowserRouter } from 'react-router';
import App from '../App';
import WelcomePage from '@pages/welcomePage/WelcomePage';
import LoginPage from '@pages/loginPage/LoginPage';
import { Pages } from '@/types/general.types';
import RegisterPage from '@pages/registerPage/RegisterPage';
import ErrorPage from '@pages/errorPage/ErrorPage';
import LobbyPage from '../pages/lobbyPage/LobbyPage';
import getRouterMiddleware from './routerMiddleware';

const { routerMiddleware } = getRouterMiddleware();

const router = createBrowserRouter([
  {
    path: Pages.WELCOME,
    Component: App,
    children: [
      { index: true, Component: WelcomePage, middleware: [routerMiddleware] },
      {
        path: Pages.LOGIN,
        Component: LoginPage,
        middleware: [routerMiddleware],
      },
      {
        path: Pages.REGISTER,
        Component: RegisterPage,
        middleware: [routerMiddleware],
      },
      {
        path: Pages.LOBBY,
        Component: LobbyPage,
        middleware: [routerMiddleware],
      },
      { path: '*', Component: ErrorPage },
    ],
  },
]);

export default router;
