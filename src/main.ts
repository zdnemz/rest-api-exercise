import logger from "./utils/logger";
import { web } from "./utils/web";
import dotenv from "dotenv";

dotenv.config();

web.listen(process.env.PORT, () => {
  logger.app.info(`Server started on port ${process.env.PORT}`);
})