import { prismaClient } from "../application/database";
import ResponseError from "../error/error";
import { v4 as uuid } from "uuid";
import { Request } from "express";
import userValidation from "../validation/userValidation";
import validate from "../validation/validation";
import bcrypt from "bcrypt";

interface ServiceFunction {
  (req: Request): Promise<object>;
}

const register: ServiceFunction = async (req) => {
  const result: { username: string; email: string; password: string } =
    await validate(userValidation.register, req);

  const countUsers = await prismaClient.users.count({
    where: {
      email: result.email,
    },
  })

  if (countUsers) {
    throw new ResponseError(400, 'User already exists')
  }

  const hashedPassword = await bcrypt.hash(result.password, 10);
  const token = uuid().toString();

  return await prismaClient.users.create({
    data: {
      username: result.username,
      email: result.email,
      password: hashedPassword,
      token
    },
    select: {
      token: true
    }
  })
};

const login: ServiceFunction = async (req) => {
  const result: { email: string; password: string } = await validate(
    userValidation.register,
    req
  );

  const user = await prismaClient.users.findUnique({
    where: {
      email: result.email
    },
    select: {
      email: true,
      password: true,
    }
  })

  if (!user) {
    throw new ResponseError(400, 'User not found')
  }

  const isValidPassword = await bcrypt.compare(result.password, user.password);

  if (!isValidPassword) {
    throw new ResponseError(400, 'Invalid password')
  }

  const token = uuid().toString();

  return await prismaClient.users.update({
    where: {
      email: result.email
    },
    data: {
      token
    },
    select: {
      token: true
    }
  })
}

export default {
  register,
  login
};
