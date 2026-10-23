import { createBrowserRouter } from 'react-router';
import App from '../App';
import WelcomePage from '@pages/welcomePage/WelcomePage';

const router = createBrowserRouter([
  {
    path: '',
    Component: App,
    children: [{ index: true, Component: WelcomePage }],
  },
]);

export default router;
