import server from './app.ts';
import 'dotenv/config';
import process from 'node:process';
import { defaultEnv } from '@repo/shared/api';

const port = process.env.PORT || defaultEnv.SERVER_PORT;

server.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
