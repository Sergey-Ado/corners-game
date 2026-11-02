import { Pages, TypedSocket } from '@/types/general.types';
import { getToken, removeToken } from '@/utils/storage';
import { MiddlewareFunction, redirect } from 'react-router';
import store from '../store/store';
import { changeUserdata } from '../store/generalSlice';
import { ServerToClientEvents, UserStatus } from '@repo/shared/socketEvents';

export default function getRouterMiddleware(socket: TypedSocket) {
  const routerMiddleware: MiddlewareFunction = async ({ request }) => {
    const protectedPages = new Set([Pages.LOBBY].map(String));

    const authToken = getToken();
    const urlEnd = request.url.split('/').at(-1) || '';

    if (authToken) {
      if (!protectedPages.has(urlEnd)) {
        throw redirect(`/${Pages.LOBBY}`);
      }

      try {
        const status = await new Promise<string>((res, rej) => {
          socket.auth = { authToken };
          socket.disconnect().connect();

          const connectListener = () => {
            socket.off('connect', connectListener);
            socket.emit('session:ask-status');
          };

          const connectErrorListener = () => {
            socket.off('connect_error', connectErrorListener);
            rej();
          };

          const sendStatusListener: ServerToClientEvents['session:send-status'] =
            ({ userId, username, status }) => {
              socket.off('session:send-status', sendStatusListener);
              store.dispatch(changeUserdata({ id: userId, username }));
              res(status);
            };

          socket.on('connect', connectListener);
          socket.on('connect_error', connectErrorListener);
          socket.on('session:send-status', sendStatusListener);
        });

        if (status === UserStatus.IN_LOBBY && urlEnd !== Pages.LOBBY) {
          throw redirect(`/${Pages.LOBBY}`);
        }
      } catch {
        removeToken();
        store.dispatch(changeUserdata({ id: '', username: '' }));

        throw redirect(`/${Pages.LOGIN}`);
      }
    } else {
      if (protectedPages.has(urlEnd)) {
        throw redirect(`/${Pages.LOGIN}`);
      }
    }
  };

  return { routerMiddleware };
}
