import ResponseError from "../error/error";
import { Errback, Request, Response, NextFunction } from "express";

const error = (
  err: Errback,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!err) {
    next();
    return;
  }

  if (err instanceof ResponseError) {
    res.status(err.status).json({ message: err.message });
    return;
  } else {
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

export default error;