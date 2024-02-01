import { prismaClient } from "../../utils/database";
import bcrypt from "bcrypt"

export const deleteUser = async (where: {}) => {
  await prismaClient.users.deleteMany({
    where,
  });
};

export const createUser = async (data: {
  username: string;
  email: string;
  password: string;
  token?: string;
}) => {
  await prismaClient.users.create({
    data : {
      username : data.username,
      email: data.email,
      password: await bcrypt.hash(data.password, 10),
      token : data.token || null
    }
  });
};
