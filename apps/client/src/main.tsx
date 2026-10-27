import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';
import router from './app/router/router';
import { Provider } from 'react-redux';
import store from './app/store/store';
import './i18n';
import { getTheme } from './utils/storage';

const root = document.querySelector('#root');

createRoot(root!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

function setGlobalStyles() {
  const theme = getTheme();
  if (theme === 'dark') document.documentElement.classList.add('dark');
}

setGlobalStyles();
