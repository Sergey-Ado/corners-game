import server from './app.ts';
import 'dotenv/config';
import process from 'node:process';
import { defaultEnv } from '@repo/shared/api';
import getLogger from './utils/logger.ts';

const port = process.env.PORT || defaultEnv.SERVER_PORT;

const logger = getLogger();

server.listen(port, () => {
  logger.info(`Server running on port ${port}...`);
});
