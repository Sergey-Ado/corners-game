import { defaultEnv } from '@repo/shared/api';
import process from 'node:process';

export default function getFrontendUrl(): string {
  return process.env.FRONTEND_URL || defaultEnv.FRONTEND_URL;
}
