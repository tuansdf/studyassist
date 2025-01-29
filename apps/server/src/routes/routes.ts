import { Hono } from "hono";
import { aiRouter } from "./ai-router.js";
import { healthRouter } from "./health-router.js";

export const routes = new Hono();

routes.route("/health", healthRouter);
routes.route("/ai", aiRouter);
