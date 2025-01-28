import { Hono } from "hono";
import { healthRouter } from "./health-router.js";

export const routes = new Hono();

routes.route("/health", healthRouter);
