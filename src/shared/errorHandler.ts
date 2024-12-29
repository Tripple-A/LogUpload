import { Request, Response, NextFunction } from 'express';

interface CustomError {
  status?: number;
  message: string;
  stack?: string;
}

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500; // Default to 500 if no status is provided
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    error: {
      status,
      message,
    },
  });

  console.error(`[${status}] ${message}`);
  if (err.stack) {
    console.error(err.stack);
  }
};

export default errorHandler;
