import { createBrowserRouter } from 'react-router';
import App from '../App';
import WelcomePage from '@pages/welcomePage/WelcomePage';
import LoginPage from '@pages/loginPage/LoginPage';
import { Pages } from '@/types/general';
import RegisterPage from '@pages/registerPage/RegisterPage';

const router = createBrowserRouter([
  {
    path: Pages.WELCOME,
    Component: App,
    children: [
      { index: true, Component: WelcomePage },
      { path: Pages.LOGIN, Component: LoginPage },
      { path: Pages.REGISTER, Component: RegisterPage },
    ],
  },
]);

export default router;
