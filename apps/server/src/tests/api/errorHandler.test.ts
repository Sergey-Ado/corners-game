import { beforeEach, describe, expect, it, vi } from 'vitest';
import { errorHandler } from '../../api/errorHandler.ts';
import { HttpStatus } from '@repo/shared/api';

describe('errorHandler', () => {
  let res: any;

  beforeEach(() => {
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should send status and message if specified', () => {
    const error = { name: 'error', message: 'fail', status: 401 };

    errorHandler(error, {} as any, res);

    expect(console.error).toHaveBeenCalledWith(error);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'fail' });
  });

  it('should send 500 and message if no status is set', () => {
    const error = { name: 'error', message: 'fail' };

    errorHandler(error, {} as any, res);

    expect(res.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(res.json).toHaveBeenCalledWith({ message: 'fail' });
  });

  it('should send status and default message if no message is set', () => {
    const error = { name: 'error', status: 401 };

    errorHandler(error as any, {} as any, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
  });
});
