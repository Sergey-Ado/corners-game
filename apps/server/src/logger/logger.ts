import { KEY_FOR_SHOW_KEY } from '../types/types.ts';
import process from 'node:process';
import 'dotenv/config';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '@repo/shared/socketEvents';
import colors from 'colors';

class Logger {
  private static instance: Logger | undefined;
  private isShow: boolean = false;

  public constructor() {
    if (Logger.instance) return Logger.instance;

    this.isShow = process.env.SHOW_LOG === KEY_FOR_SHOW_KEY;

    Logger.instance = this;
  }

  public emit<T extends keyof ServerToClientEvents>(
    userIds: string[],
    event: T,
    payload: ServerToClientEvents[T] extends (argument: infer P) => void
      ? P
      : never
  ): void {
    if (!this.isShow) return;

    console.log(colors.yellow(event), colors.green('TO'), userIds);

    if (!payload) return;

    console.log('payload:', payload);
  }

  public on<T extends keyof ClientToServerEvents>(
    userId: string,
    event: T,
    payload?: ClientToServerEvents[T] extends (argument: infer P) => void
      ? P
      : never
  ): void {
    if (!this.isShow) return;

    console.log(colors.magenta(event), colors.green('FROM'), userId);

    if (!payload) return;

    console.log('payload:', payload);
  }

  public info(...messages: string[]): void {
    if (!this.isShow) return;

    console.log(...messages.map(message => colors.blue(message)));
  }

  public request(method: string, url: string, body: unknown): void {
    console.log(
      colors.magenta('Request:'),
      colors.green(method),
      colors.green(url)
    );

    if (!body) return;

    console.log('body:', body);
  }

  public response(
    method: string,
    url: string,
    statusCode: number,
    body: unknown
  ): void {
    console.log(
      colors.yellow('Response: '),
      colors.green(method),
      colors.green(url),
      colors.red(statusCode.toString())
    );

    if (!body) return;

    console.log('body:', body);
  }
}

const getLogger = (): Logger => new Logger();

export default getLogger;
