import { TypedSocket } from '@/types/general.types';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import getRouterMiddleware from './routerMiddleware';
import Storage from '@/utils/storage';
import { UserStatus } from '@repo/shared/socketEvents';
import { MiddlewareFunction } from 'react-router';

beforeEach(() => {
  vi.restoreAllMocks();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('getRouterMiddleware', () => {
  const socket: Partial<TypedSocket> = {};

  it('should return function', () => {
    const { routerMiddleware } = getRouterMiddleware(socket as TypedSocket);

    expect(routerMiddleware).toEqual(expect.any(Function));
  });
});

describe('routerMiddleware', () => {
  it('should redirect to /lobby if status is in-lobby and url is not /lobby', async () => {
    vi.spyOn(Storage.prototype, 'getToken').mockImplementation(
      () => 'test-token'
    );

    const handlers = new Map();

    const socket = {
      on: vi.fn((event: string, handler: (...args: any[]) => void) => {
        handlers.set(event, handler);
      }),
      off: vi.fn(),
      emit: vi.fn(),
      connect: vi.fn().mockReturnThis(),
      disconnect: vi.fn().mockReturnThis(),
    } as unknown as TypedSocket;

    const { routerMiddleware } = getRouterMiddleware(socket as TypedSocket);
    const request = new Request('http://localhost/game');
    const middlewarePromise = routerMiddleware(
      { request } as any,
      {} as any
    ) as Promise<MiddlewareFunction>;

    handlers.get('connect')();
    expect(socket.off).toHaveBeenCalledWith('connect', expect.any(Function));
    expect(socket.emit).toHaveBeenCalledWith('session:ask-status');

    handlers.get('session:send-status')({
      userId: 'user-1',
      username: 'username-1',
      status: UserStatus.IN_LOBBY,
    });
    expect(socket.off).toHaveBeenCalledWith(
      'session:send-status',
      expect.any(Function)
    );

    let response: Response;

    try {
      await middlewarePromise;
      throw new Error('redirect to /lobby was expected');
    } catch (error) {
      response = error as Response;
    }

    expect(response.status).toBe(302);
    expect(response.headers.get('Location')).toBe('/lobby');
  });

  it('should redirect to /game if status is in-game and url is not /game', async () => {
    vi.spyOn(Storage.prototype, 'getToken').mockImplementation(
      () => 'test-token'
    );

    const handlers = new Map();

    const socket = {
      on: vi.fn((event: string, handler: (...args: any[]) => void) => {
        handlers.set(event, handler);
      }),
      off: vi.fn(),
      emit: vi.fn(),
      connect: vi.fn().mockReturnThis(),
      disconnect: vi.fn().mockReturnThis(),
    } as unknown as TypedSocket;

    const { routerMiddleware } = getRouterMiddleware(socket as TypedSocket);
    const request = new Request('http://localhost/lobby');
    const middlewarePromise = routerMiddleware(
      { request } as any,
      {} as any
    ) as Promise<MiddlewareFunction>;

    handlers.get('connect')();
    expect(socket.off).toHaveBeenCalledWith('connect', expect.any(Function));
    expect(socket.emit).toHaveBeenCalledWith('session:ask-status');

    handlers.get('session:send-status')({
      userId: 'user-1',
      username: 'username-1',
      status: UserStatus.IN_GAME,
    });
    expect(socket.off).toHaveBeenCalledWith(
      'session:send-status',
      expect.any(Function)
    );

    let response: Response;

    try {
      await middlewarePromise;
      throw new Error('redirect to /game was expected');
    } catch (error) {
      response = error as Response;
    }

    expect(response.status).toBe(302);
    expect(response.headers.get('Location')).toBe('/game');
  });

  it('should not redirect if status is in-game and url is /game', async () => {
    vi.spyOn(Storage.prototype, 'getToken').mockImplementation(
      () => 'test-token'
    );

    const handlers = new Map();

    const socket = {
      on: vi.fn((event: string, handler: (...args: any[]) => void) => {
        handlers.set(event, handler);
      }),
      off: vi.fn(),
      emit: vi.fn(),
      connect: vi.fn().mockReturnThis(),
      disconnect: vi.fn().mockReturnThis(),
    } as unknown as TypedSocket;

    const { routerMiddleware } = getRouterMiddleware(socket as TypedSocket);
    const request = new Request('http://localhost/game');
    const middlewarePromise = routerMiddleware(
      { request } as any,
      {} as any
    ) as Promise<MiddlewareFunction>;

    handlers.get('connect')();
    expect(socket.off).toHaveBeenCalledWith('connect', expect.any(Function));
    expect(socket.emit).toHaveBeenCalledWith('session:ask-status');

    handlers.get('session:send-status')({
      userId: 'user-1',
      username: 'username-1',
      status: UserStatus.IN_GAME,
    });
    expect(socket.off).toHaveBeenCalledWith(
      'session:send-status',
      expect.any(Function)
    );

    let response: Response;

    try {
      await middlewarePromise;
      throw new Error('redirect to /game was expected');
    } catch (error) {
      response = error as Response;
    }

    expect(response.status).not.toBe(302);
  });

  it('should redirect to /login if there is sent connect_error message', async () => {
    vi.spyOn(Storage.prototype, 'getToken').mockImplementation(
      () => 'test-token'
    );

    const handlers = new Map();

    const socket = {
      on: vi.fn((event: string, handler: (...args: any[]) => void) => {
        handlers.set(event, handler);
      }),
      off: vi.fn(),
      emit: vi.fn(),
      connect: vi.fn().mockReturnThis(),
      disconnect: vi.fn().mockReturnThis(),
    } as unknown as TypedSocket;

    const { routerMiddleware } = getRouterMiddleware(socket as TypedSocket);
    const request = new Request('http://localhost/game');
    const middlewarePromise = routerMiddleware(
      { request } as any,
      {} as any
    ) as Promise<MiddlewareFunction>;

    handlers.get('connect_error')();
    expect(socket.off).toHaveBeenCalledWith(
      'connect_error',
      expect.any(Function)
    );

    let response: Response;

    try {
      await middlewarePromise;
      throw new Error('redirect to /game was expected');
    } catch (error) {
      response = error as Response;
    }

    expect(response.status).toBe(302);
    expect(response.headers.get('Location')).toBe('/login');
  });

  it('should redirect to /lobby if authToken is exist and path is not protected', async () => {
    vi.spyOn(Storage.prototype, 'getToken').mockImplementation(
      () => 'test-token'
    );

    const socket = {} as unknown as TypedSocket;

    const { routerMiddleware } = getRouterMiddleware(socket as TypedSocket);
    const request = new Request('http://localhost/');
    const middlewarePromise = routerMiddleware(
      { request } as any,
      {} as any
    ) as Promise<MiddlewareFunction>;

    let response: Response;

    try {
      await middlewarePromise;
      throw new Error('redirect to /lobby was expected');
    } catch (error) {
      response = error as Response;
    }

    expect(response.status).toBe(302);
    expect(response.headers.get('Location')).toBe('/lobby');
  });

  it('should redirect to /login if authToken is not exist and path is protected', async () => {
    vi.spyOn(Storage.prototype, 'getToken').mockImplementation(() => '');

    const socket = {
      off: vi.fn(),
      emit: vi.fn(),
      connect: vi.fn().mockReturnThis(),
      disconnect: vi.fn().mockReturnThis(),
    } as unknown as TypedSocket;

    const { routerMiddleware } = getRouterMiddleware(socket as TypedSocket);
    const request = new Request('http://localhost/lobby');
    const middlewarePromise = routerMiddleware(
      { request } as any,
      {} as any
    ) as Promise<MiddlewareFunction>;

    let response: Response;

    try {
      await middlewarePromise;
      throw new Error('redirect to /lobby was expected');
    } catch (error) {
      response = error as Response;
    }

    expect(response.status).toBe(302);
    expect(response.headers.get('Location')).toBe('/login');
  });

  it('should not redirect if authToken is not exist and path is not protected', async () => {
    vi.spyOn(Storage.prototype, 'getToken').mockImplementation(() => '');

    const socket = {
      off: vi.fn(),
      emit: vi.fn(),
      connect: vi.fn().mockReturnThis(),
      disconnect: vi.fn().mockReturnThis(),
    } as unknown as TypedSocket;

    const { routerMiddleware } = getRouterMiddleware(socket as TypedSocket);
    const request = new Request('http://localhost/error-path');
    const middlewarePromise = routerMiddleware(
      { request } as any,
      {} as any
    ) as Promise<MiddlewareFunction>;

    let response: Response;

    try {
      await middlewarePromise;
      throw new Error('redirect to /error-path was expected');
    } catch (error) {
      response = error as Response;
    }

    expect(response.status).not.toBe(302);
  });
});
