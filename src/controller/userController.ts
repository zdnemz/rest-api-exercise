import { Request, Response, NextFunction } from "express";
import userService from "../services/userService";
import success from "../res/success";

interface ControllerFunction {
  (req: Request, res: Response, next: NextFunction): Promise<void>;
}

const register: ControllerFunction = async (req, res, next) => {
  try {
    const result = await userService.register(req.body, res, next);
    if (result) {
      res.status(201).json(success(201, result));
    }
  } catch (err: any) {
    next(err);
  }
};

const login: ControllerFunction = async (req, res, next) => {
  try {
    const result = await userService.login(req.body, res, next);
    if (result) {
      res.status(200).json(success(200, result));
    }
  } catch (err: any) {
    next(err);
  }
};

export default { register, login };
