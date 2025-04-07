import { Request, Response, NextFunction } from 'express';
import { AppError } from '../types/index.js';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
};