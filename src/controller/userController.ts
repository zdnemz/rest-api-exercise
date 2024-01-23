import { Request, Response, NextFunction } from "express";
import userService from "../services/userService";

interface ControllerFunction {
  (req: Request, res: Response, next: NextFunction): Promise<void>;
}

const register: ControllerFunction = async (req, res, next) => {
  try {
    const result = await userService.register(req.body);
    res.status(200).json({ data: result });
  } catch (err: any) {
    next(err);
  }
};

const login: ControllerFunction = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);
    res.status(200).json({ data: result });
  } catch (err: any) {
    next(err);
  }
}

export default { register, login };
