import { Request, Response, NextFunction } from 'express';
import getLogger from '../../utils/logger.ts';

const apiResponseMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const originalJson = res.json;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res.json = (data: any): any => {
    const logger = getLogger();

    logger.response(req.method, req.baseUrl, res.statusCode, data);

    return originalJson.call(res, data);
  };

  next();
};

export default apiResponseMiddleware;
