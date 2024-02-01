import { prismaClient } from "../../utils/database";

export const after = async (where: {}) => {
  await prismaClient.users.deleteMany({
    where,
  });
};

export const before = async (data: {
  username: string;
  email: string;
  password: string;
  token?: string;
}) => {
  await prismaClient.users.create({
    data,
  });
};
