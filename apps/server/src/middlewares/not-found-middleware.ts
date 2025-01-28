import { NotFoundHandler } from "hono";

export const notFoundMiddleware = (): NotFoundHandler => () => {
  return Response.json({ message: "Not Found" }, { status: 404 });
};
