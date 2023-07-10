import type { Request, Response, NextFunction } from 'express';

import { YandexAPIService } from '../api/yandexAPIService';

//@ts-ignore
import { ApiError } from '../helpers/apiError';

//@ts-ignore
export const checkAuthorization = async (
  req: Request,
  //@ts-ignore
  res: Response,
  //@ts-ignore
  next: NextFunction,
) => {
  //@ts-ignore
  // eslint-disable-next-line dot-notation
  const apiService = new YandexAPIService();
  console.log('req.cookies', req.cookies);
  console.log('req.signedCookies', req.signedCookies);
  next();
  // try {
  //   const user = await apiService.getCurrentUser();
  //   console.log(user);
  //   next();
  // } catch (error) {
  //   console.log('error', error);
  //   if (error instanceof ApiError) {
  //     res
  //       .status(error.status)
  //       .set({ 'Content-Type': 'text/html' })
  //       .end(error.message);
  //     return;
  //   }
  //   res.status(500).end();
  // }
};
