import { Hono } from "hono";
import { openaiService } from "../modules/ai/openai-service.js";

export const aiRouter = new Hono();

aiRouter.post("/questions", async (c) => {
  const request = await c.req.json();
  return Response.json(await openaiService.generateQuestions(request));
});

aiRouter.post("/mind-maps", async (c) => {
  const request = await c.req.json();
  return new Response(await openaiService.generateMindMap(request.text));
});
