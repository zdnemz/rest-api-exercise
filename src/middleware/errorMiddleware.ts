import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

interface ErrorType {
  success: boolean;
  status: number;
  error: {
    message: string;
    details: string;
  };
}

const error = (
  err: ErrorType,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!err) {
    next();
    return;
  }

  res.status(err.status).json(err);
  logger.app.error(JSON.stringify(err))
  return;
};

export default error;
