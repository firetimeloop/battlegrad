import type { Request, Response, NextFunction } from 'express';

import { YandexAPIService } from '../api/yandexAPIService';

import { ApiError } from '../helpers/apiError';

export const checkAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // eslint-disable-next-line dot-notation
  const apiService = new YandexAPIService(req.headers.cookie);
  try {
    await apiService.getCurrentUser();
    next();
  } catch (error) {
    if (error instanceof ApiError) {
      res
        .status(error.status)
        .set({ 'Content-Type': 'text/html' })
        .end(error.message);
      return;
    }
    res.status(500).end();
  }
};
