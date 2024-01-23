import logger from "./application/logger";
import { web } from "./application/web";
import dotenv from "dotenv";

dotenv.config();

web.listen(process.env.PORT, () => {
  logger.info(`Listening on port ${process.env.PORT}`);
})