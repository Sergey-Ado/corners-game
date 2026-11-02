import { createBrowserRouter } from 'react-router';
import App from '../App';
import WelcomePage from '@pages/welcomePage/WelcomePage';
import LoginPage from '@pages/loginPage/LoginPage';
import { Pages, TypedSocket } from '@/types/general.types';
import RegisterPage from '@pages/registerPage/RegisterPage';
import ErrorPage from '@pages/errorPage/ErrorPage';
import LobbyPage from '../pages/lobbyPage/LobbyPage';
import getRouterMiddleware from './routerMiddleware';
import { getServerUrl } from '@/utils/getServerUrl';
import { io } from 'socket.io-client';

const serverUrl = getServerUrl();

const socket: TypedSocket = io(serverUrl, {
  autoConnect: false,
});

socket.on('connect', () => {
  console.log('connected');
});

const { routerMiddleware } = getRouterMiddleware(socket);

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
