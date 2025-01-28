import { MiddlewareHandler } from "hono";
import { logger } from "../utils/logger.js";

export const loggerMiddleware = (): MiddlewareHandler => async (c, next) => {
  let extra = "";
  const url = new URL(c.req.url);
  const pathname = url.pathname;
  const search = url.search;
  const method = c.req.method.padEnd(7, " ");
  logger.info(`<-- ENTER ${method} ${pathname}${search}${extra}`);
  await next();
  logger.info(`--> EXIT  ${method} ${pathname} ${c.res.status}`);
};
