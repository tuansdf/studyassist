import { S } from "fluent-json-schema";
import OpenAI from "openai";
import { Env } from "../../constants/env.js";
import { GenerateQuestionsRequest } from "../../types/question.type.js";
import { AiService } from "./ai-service.js";

const client = new OpenAI({
  apiKey: Env.OPENAI_API_KEY,
});

const generateQuestionsSchema = S.object()
  .additionalProperties(false)
  .prop(
    "data",
    S.array()
      .items(
        S.object()
          .additionalProperties(false)
          .prop("text", S.string().required())
          .prop(
            "answers",
            S.array()
              .items(
                S.object()
                  .additionalProperties(false)
                  .prop("text", S.string().required())
                  .prop("isCorrect", S.boolean().required()),
              )
              .required(),
          ),
      )
      .required(),
  )
  .valueOf() as Record<string, unknown>;

export class OpenaiService implements AiService {
  public async generateQuestions(request: GenerateQuestionsRequest) {
    try {
      const chatCompletion = await client.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are an exceptional, Nobel Prize-winning professor. Assist the user in memorizing the provided content by creating a quiz with ${request.numOfQuestion} questions, each offering ${request.optionsPerQuestion} answer options. The quiz ${request.isMultipleChoice ? "can" : "cannot"} include multiple-choice questions.`,
          },
          { role: "user", content: request.text },
        ],
        model: "gpt-4o-mini",
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "questions",
            schema: generateQuestionsSchema,
            strict: true,
          },
        },
      });
      return JSON.parse(chatCompletion.choices[0]?.message.content || "") || [];
    } catch (e) {
      console.error("generateQuestions", e);
      return [];
    }
  }
}

export const openaiService = new OpenaiService();
