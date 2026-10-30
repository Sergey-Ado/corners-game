import { HttpStatus } from '@repo/shared/api';
import { Request, Response } from 'express';

interface AppError extends Error {
  status?: number;
}

export const errorHandler = (
  error: AppError,
  req: Request,
  res: Response
): void => {
  console.error(error);
  res
    .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
    .json({ message: error.message || 'Internal server error' });
};
