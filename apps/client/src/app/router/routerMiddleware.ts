import { Pages } from '@/types/general.types';
import { getToken } from '@/utils/storage';
import { MiddlewareFunction, redirect } from 'react-router';

const routerMiddleware: MiddlewareFunction = ({ request }) => {
  const protectedPages = new Set([Pages.LOBBY].map(String));

  const authToken = getToken();
  const urlEnd = request.url.split('/').at(-1) || '';

  if (authToken) {
    if (!protectedPages.has(urlEnd)) {
      throw redirect(`/${Pages.LOBBY}`);
    }
  } else {
    if (protectedPages.has(urlEnd)) {
      throw redirect(`/${Pages.LOGIN}`);
    }
  }
};

export default function getRouterMiddleware() {
  return { routerMiddleware };
}
