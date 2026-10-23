import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';
import router from './app/router/router';

const root = document.querySelector('#root');

createRoot(root!).render(<RouterProvider router={router} />);
