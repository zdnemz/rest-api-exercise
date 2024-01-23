import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.File({
      filename: "error.log",
      level: "error",
      dirname: "logs",
    }),
    new winston.transports.File({
      filename: "combined.log",
      dirname: "logs",
      format: winston.format.simple(),
    }),
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

export default logger;
