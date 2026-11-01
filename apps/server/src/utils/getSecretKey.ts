import { defaultEnv } from '@repo/shared/api';
import process from 'node:process';

export default function getSecretKey(): string {
  return process.env.JWT_SECRET_KEY || defaultEnv.JWT_SECRET_KEY;
}
