import { ErrorHandler } from "hono";
import { exceptionUtils } from "../exceptions/exception-utils.js";
import { logger } from "../utils/logger.js";

export const errorHandlerMiddleware = (): ErrorHandler => (error) => {
  logger.error(error);
  return exceptionUtils.toResponse(error);
};
