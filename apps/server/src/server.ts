import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import { Env } from "./constants/env.js";
import { errorHandlerMiddleware } from "./middlewares/error-handler-middleware.js";
import { loggerMiddleware } from "./middlewares/logger-middleware.js";
import { notFoundMiddleware } from "./middlewares/not-found-middleware.js";
import { routes } from "./routes/routes.js";

const app = new Hono();

app.use(cors());
app.use(secureHeaders());
app.use(loggerMiddleware());

app.route("/api", routes);

app.notFound(notFoundMiddleware());
app.onError(errorHandlerMiddleware());

const port = Env.PORT || 5000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
