import { prismaClient } from "../utils/database";
import { v4 as uuid } from "uuid";
import userValidation from "../validation/schema/userValidation";
import validate from "../validation/validation";
import bcrypt from "bcrypt";
import { NextFunction, Response } from "express";
import error from "../res/error";

interface ServiceFunction {
  (req: object, res: Response, next: NextFunction): Promise<object>;
}

const register: ServiceFunction = async (req, res, next) => {
  const result: { username: string; email: string; password: string } =
    await validate(userValidation.register, req, next);

  const countUsers = await prismaClient.users.count({
    where: {
      email: result.email,
    },
  });

  if (countUsers) {
    next(
      error(400, {
        message: "User already exists",
        details: `The email ${result.email} already exists`,
      })
    );
    return;
  }

  const hashedPassword = await bcrypt.hash(result.password, 10);
  const token = uuid().toString();

  return await prismaClient.users.create({
    data: {
      username: result.username,
      email: result.email,
      password: hashedPassword,
      token,
    },
    select: {
      token: true,
    },
  });
};

const login: ServiceFunction = async (req, res, next) => {
  const result: { email: string; password: string } = await validate(
    userValidation.login,
    req,
    next
  );

  const user = await prismaClient.users.findUnique({
    where: {
      email: result.email,
    },
    select: {
      email: true,
      password: true,
    },
  });

  if (!user) {
    next(
      error(400, {
        message: "User or password invalid",
        details: `The email ${result.email} or the password is not valid`,
      })
    );
  }

  const isValidPassword = await bcrypt.compare(result.password, user.password);

  if (!isValidPassword) {
    next(
      error(400, {
        message: "User or password invalid",
        details: `The email ${result.email} or the password is not valid`,
      })
    );
  }

  const token = uuid().toString();

  return await prismaClient.users.update({
    where: {
      email: result.email,
    },
    data: {
      token,
    },
    select: {
      token: true,
    },
  });
};

export default {
  register,
  login,
};
