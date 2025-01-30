import { S } from "fluent-json-schema";
import OpenAI from "openai";
import { Env } from "../../constants/env.js";
import {
  GenerateDiagramRequest,
  GenerateLearningObjectivesRequest,
  GenerateQuestionsRequest,
  LearningObjective,
  Question,
} from "../../types/question.type.js";
import { aiDiagramExample } from "./ai-diagram-example.js";
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
                  .prop("correct", S.boolean().required()),
              )
              .required(),
          ),
      )
      .required(),
  )
  .valueOf() as Record<string, unknown>;

const generateDiagramSchema = S.object()
  .additionalProperties(false)
  .prop("data", S.string().required())
  .valueOf() as Record<string, unknown>;

const generateLearningObjectivesSchema = S.object()
  .additionalProperties(false)
  .prop("data", S.array().items(S.object().additionalProperties(false).prop("text", S.string().required())).required())
  .valueOf() as Record<string, unknown>;

export class OpenaiService implements AiService {
  public async generateQuestions(request: GenerateQuestionsRequest): Promise<Question[]> {
    try {
      const chatCompletion = await client.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `As an exceptional, Nobel Prize-winning professor, assist the user in memorizing the provided content by creating a quiz with ${request.numOfQuestion} questions, each offering ${request.optionsPerQuestion} answer options. The quiz ${request.isMultipleChoice ? "can" : "cannot"} include multiple-choice questions.`,
          },
          { role: "user", content: request.text },
        ],
        model: "gpt-4o-mini",
        temperature: 0,
        top_p: 0,
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "questions",
            schema: generateQuestionsSchema,
            strict: true,
          },
        },
      });
      const result = chatCompletion.choices[0]?.message.content;
      if (!result) return [];
      return JSON.parse(result).data || [];
    } catch (e) {
      console.error("generateQuestions", e);
      return [];
    }
  }

  public async generateDiagram(request: GenerateDiagramRequest): Promise<string> {
    try {
      const chatCompletion = await client.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `As an exceptional, Nobel Prize-winning professor, assist the user in memorizing the provided content by creating a "mermaid" (Mermaid is a tool that renders Markdown-inspired text definitions) ${request.type} diagram. If the diagram type is unfamiliar, refer to the following description: ${aiDiagramExample[request.type]}`,
          },
          { role: "user", content: request.text },
        ],
        model: "gpt-4o-mini",
        temperature: 0,
        top_p: 0,
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "diagram",
            schema: generateDiagramSchema,
          },
        },
      });
      const result = chatCompletion.choices[0]?.message.content;
      if (!result) return "";
      return JSON.parse(result).data || "";
    } catch (e) {
      console.error("generateDiagram", e);
      return "";
    }
  }

  public async generateLearningObjectives(request: GenerateLearningObjectivesRequest): Promise<LearningObjective[]> {
    try {
      const chatCompletion = await client.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `As an exceptional, Nobel Prize-winning professor, assist the user in learning the topic by creating a list of learning objectives.
Example:
User question: How do I secure user passwords in a web application?
Learning objectives:
Introduction to Password Security
Hashing vs. Encryption: Key Differences
Common Hashing Algorithms (Argon2, bcrypt, scrypt)
Salting and Peppering Explained
Implementing Secure Password Storage in Web Apps
Password Policies and Best Practices
Multi-Factor Authentication (MFA) and Alternatives
Preventing Brute Force and Dictionary Attacks
Storing and Managing Password Resets Securely
Future Trends in Password Security`,
          },
          { role: "user", content: request.text },
        ],
        model: "gpt-4o-mini",
        temperature: 0,
        top_p: 0,
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "learning-objectives",
            schema: generateLearningObjectivesSchema,
          },
        },
      });
      const result = chatCompletion.choices[0]?.message.content;
      if (!result) return [];
      return JSON.parse(result).data || [];
    } catch (e) {
      console.error("LearningObjectives", e);
      return [];
    }
  }
}

export const openaiService = new OpenaiService();
