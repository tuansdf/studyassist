import { Hono } from "hono";
import { openaiService } from "../modules/ai/openai-service.js";

export const aiRouter = new Hono();

aiRouter.post("/questions", async (c) => {
  const request = await c.req.json();
  return Response.json({ data: await openaiService.generateQuestions(request) });
});

aiRouter.post("/diagrams", async (c) => {
  const request = await c.req.json();
  return Response.json({ data: await openaiService.generateDiagram(request) });
});

aiRouter.post("/learning-objectives", async (c) => {
  const request = await c.req.json();
  return Response.json({ data: await openaiService.generateLearningObjectives(request) });
});
