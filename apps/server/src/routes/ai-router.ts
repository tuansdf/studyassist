import { Hono } from "hono";
import { openaiService } from "../modules/ai/openai-service.js";

export const aiRouter = new Hono();

aiRouter.all("/", async (c) => {
  const request = await c.req.json();
  return Response.json(openaiService.generateQuestions(request));
});
