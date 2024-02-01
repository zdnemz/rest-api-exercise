import { PrismaClient } from "@prisma/client";
import logger from "./logger";

export const prismaClient = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "event",
      level: "error",
    },
    {
      emit: "event",
      level: "info",
    },
    {
      emit: "event",
      level: "warn",
    },
  ],
});

prismaClient.$on("query", (e) => {
  logger.database.info(
    JSON.stringify({
      level: "query",
      message: e.query,
      params: e.params,
      duration: e.duration,
      time: e.timestamp,
      target: e.target,
    })
  );
});

prismaClient.$on("info", (e) => {
  logger.database.info(
    JSON.stringify({
      level: "info",
      message: e.message,
      time: e.timestamp,
    })
  );
});

prismaClient.$on("error", (e) => {
  logger.database.error(
    JSON.stringify({
      level: "error",
      message: e.message,
      time: e.timestamp,
    })
  );
});

prismaClient.$on("warn", (e) => {
  logger.database.warn(
    JSON.stringify({
      level: "warn",
      message: e.message,
      time: e.timestamp,
    })
  );
});
