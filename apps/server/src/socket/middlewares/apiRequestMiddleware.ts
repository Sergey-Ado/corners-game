import { Request, Response, NextFunction } from 'express';
import { getLogger } from '../../logger/logger.ts';

const apiRequestMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // console.log(req.method, req.url, req.body || '');
  const logger = getLogger();

  logger.request(req.method, req.url, req.body || '');

  next();
};

export default apiRequestMiddleware;
