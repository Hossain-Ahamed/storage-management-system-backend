/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

<<<<<<< HEAD
export const notFound = (req: Request, res: Response, next: NextFunction)  => {
=======
export const notFound = (req: Request, res: Response, next: NextFunction) => {
>>>>>>> 2e5d2b06e69d012a04b7fc55ea3a607012bd2581
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'API not found',
    error: '',
  });
};
