import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { Endpoints } from '@repo/shared/api';

describe('app.ts', () => {
  it('should export http.Server with listen method', async () => {
    const appModule = await import('../app.ts');
    const srv = appModule.default;
    expect(typeof srv.listen).toBe('function');
  });

  it('should respond to a request to the endpoint "/"', async () => {
    const appModule = await import('../app.ts');
    const srv = appModule.default;

    const res = await request(srv).get(Endpoints.BASE);

    expect(res.text).toBe('Hello world!');
  });
});
