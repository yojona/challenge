import { NextFunction, Request, Response } from 'express';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  // handle token authentication, not for this challenge
  next();
};
