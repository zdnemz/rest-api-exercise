import winston from "winston";

const createFileTransport = (
  filename: string,
  level: string,
  dirname: string
) =>
  new winston.transports.File({
    filename,
    level,
    dirname,
    format: winston.format.simple(),
  });

const transports = {
  database: [
    createFileTransport("query.log", "info", "logs/database"),
    createFileTransport("error.log", "error", "logs/database"),
    createFileTransport("warn.log", "warn", "logs/database"),
    createFileTransport("info.log", "info", "logs/database"),
  ],
  app: [
    createFileTransport("error.log", "error", "logs/app"),
    createFileTransport("info.log", "info", "logs/app"),
  ],
};

const createLogger = (transports: winston.transport[]) => {
  return winston.createLogger({
    format: winston.format.combine(
      winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      winston.format.simple()
    ),
    transports,
  });
};

const logger = {
  app: createLogger(transports.app),
  database: createLogger(transports.database),
};

export default logger;
