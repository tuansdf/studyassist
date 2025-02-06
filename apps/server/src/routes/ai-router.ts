import { Hono } from "hono";
import { geminiService } from "../modules/ai/gemini-service.js";
import { openaiService } from "../modules/ai/openai-service.js";

export const aiRouter = new Hono();

aiRouter.post("/questions", async (c) => {
  const request = await c.req.json();
  return Response.json({ data: await geminiService.generateQuestions(request) });
});

aiRouter.post("/diagrams", async (c) => {
  const request = await c.req.json();
  return Response.json({ data: await geminiService.generateDiagram(request) });
});

aiRouter.post("/learning-objectives", async (c) => {
  const request = await c.req.json();
  return Response.json({ data: await geminiService.generateLearningObjectives(request) });
});

aiRouter.post("/learning-content", async (c) => {
  const request = await c.req.json();
  return Response.json({ data: await geminiService.generateLearningContent(request) });
});
