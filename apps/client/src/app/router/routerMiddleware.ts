import { Pages } from '@/types/general.types';
import { getToken } from '@/utils/storage';
import { MiddlewareFunction, redirect } from 'react-router';
import { Socket } from 'socket.io-client';
import store from '../store/store';
import { changeUserdata } from '../store/generalSlice';
import { UserStatus } from '@repo/shared/socketEvents';

export default function getRouterMiddleware(socket: Socket) {
  const routerMiddleware: MiddlewareFunction = async ({ request }) => {
    const protectedPages = new Set([Pages.LOBBY].map(String));

    const authToken = getToken();
    const urlEnd = request.url.split('/').at(-1) || '';

    if (authToken) {
      if (!protectedPages.has(urlEnd)) {
        throw redirect(`/${Pages.LOBBY}`);
      }

      const status = await new Promise<string>(res => {
        socket.auth = { authToken };
        socket.disconnect().connect();

        const connectListener = () => {
          socket.off('connect', connectListener);
          const id = sessionStorage.getItem('id') || 'x';
          const username = sessionStorage.getItem('username') || 'x';
          if (id && username)
            socket.emit('session:ask-status', { id, username });
        };

        const sendStatusListener = ({
          userId,
          username,
          status,
        }: {
          userId: string;
          username: string;
          status: string;
        }) => {
          socket.off('session:send-status', sendStatusListener);
          store.dispatch(changeUserdata({ id: userId, username }));
          res(status);
        };

        socket.on('connect', connectListener);
        socket.on('session:send-status', sendStatusListener);
      });

      if (status === UserStatus.IN_LOBBY && urlEnd !== Pages.LOBBY) {
        throw redirect(`/${Pages.LOBBY}`);
      }
    } else {
      if (protectedPages.has(urlEnd)) {
        throw redirect(`/${Pages.LOGIN}`);
      }
    }
  };

  return { routerMiddleware };
}
