import { describe, expect, it, vi } from 'vitest';
import { Request, Response, NextFunction } from 'express';
import apiResponseMiddleware from '../../socket/middlewares/apiResponseMiddleware.ts';

const { logResponse } = vi.hoisted(() => ({
  logResponse: vi.fn(),
}));

vi.mock('../../logger/logger.ts', () => ({
  default: (): any => ({ response: logResponse }),
}));

describe('apiResponseMiddleware', () => {
  it('should log response data and call original res.json', () => {
    const next = vi.fn();
    const data = { message: 'Created' };
    const originalJson = vi.fn();

    const req = {
      method: 'POST',
      baseUrl: '/api/user',
    } as Request;

    const res = {
      statusCode: 201,
      json: originalJson,
    } as unknown as Response;

    apiResponseMiddleware(req, res, next as NextFunction);
    res.json(data);

    expect(next).toHaveBeenCalledOnce();
    expect(logResponse).toHaveBeenCalledWith('POST', '/api/user', 201, data);
    expect(originalJson).toHaveBeenCalledWith(data);
  });
});
