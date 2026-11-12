import { Request, Response, NextFunction } from 'express';
import getLogger from '../../utils/logger.ts';

const apiRequestMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const logger = getLogger();

  logger.request(req.method, req.url, req.body || '');

  next();
};

export default apiRequestMiddleware;
