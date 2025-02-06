import { Type } from "@sinclair/typebox";
import ky from "ky";
import { Env } from "../../constants/env.js";
import {
  GenerateDiagramRequest,
  GenerateLearningContentRequest,
  GenerateLearningObjectivesRequest,
  GenerateQuestionsRequest,
  LearningContent,
  LearningObjective,
  Question,
} from "../../types/question.type.js";
import { aiDiagramExample } from "./ai-diagram-example.js";
import { AiService } from "./ai-service.js";

const geminiRequest = ky.create({ prefixUrl: Env.GEMINI_BASE_URL, timeout: 300000 });

const generateQuestionsSchema = Type.Object({
  data: Type.Array(
    Type.Object({
      text: Type.String(),
      answers: Type.Array(Type.Object({ text: Type.String(), correct: Type.Boolean() })),
    }),
  ),
}) as Record<string, unknown>;

export const generateDiagramSchema = Type.Object({
  data: Type.String(),
}) as Record<string, unknown>;

export const generateLearningObjectivesSchema = Type.Object({
  data: Type.Array(Type.Object({ text: Type.String() })),
}) as Record<string, unknown>;

export const generateLearningContentSchema = Type.Object({
  data: Type.Array(Type.Object({ text: Type.String(), citations: Type.Array(Type.String()) })),
}) as Record<string, unknown>;

export class GeminiService implements AiService {
  public async generateQuestions(request: GenerateQuestionsRequest): Promise<Question[]> {
    try {
      const response = await geminiRequest.post(`gemini-2.0-flash:generateContent?key=${Env.GEMINI_API_KEY}`, {
        json: {
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: generateQuestionsSchema,
            topP: 1,
            temperature: 1,
          },
          systemInstruction: {
            parts: [
              {
                text: `As an exceptional, Nobel Prize-winning professor, assist the user in memorizing the provided content by creating a quiz with ${request.numOfQuestion} questions, each offering ${request.optionsPerQuestion} answer options. The quiz ${request.isMultipleChoice ? "can" : "cannot"} include multiple-choice questions.`,
              },
            ],
          },
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: request.text,
                },
              ],
            },
          ],
        },
      });
      const result = (await response.json()) as any;
      if (!result) return [];
      return JSON.parse(result.candidates[0].content.parts[0].text).data || [];
    } catch (e: any) {
      console.error("generateQuestions", e);
      return [];
    }
  }

  public async generateDiagram(request: GenerateDiagramRequest): Promise<string> {
    try {
      const response = await geminiRequest.post(`gemini-2.0-flash:generateContent?key=${Env.GEMINI_API_KEY}`, {
        json: {
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: generateDiagramSchema,
            topP: 1,
            temperature: 1,
          },
          systemInstruction: {
            parts: [
              {
                text: `As an exceptional, Nobel Prize-winning professor, assist the user in memorizing the provided content by creating a "mermaid" (Mermaid is a tool that renders Markdown-inspired text definitions) ${request.type} diagram. If the diagram type is unfamiliar, refer to the following description: ${aiDiagramExample[request.type]}`,
              },
            ],
          },
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: request.text,
                },
              ],
            },
          ],
        },
      });
      const result = (await response.json()) as any;
      if (!result) return "";
      return JSON.parse(result.candidates[0].content.parts[0].text).data || "";
    } catch (e) {
      console.error("generateDiagram", e);
      return "";
    }
  }

  public async generateLearningObjectives(request: GenerateLearningObjectivesRequest): Promise<LearningObjective[]> {
    try {
      const response = await geminiRequest.post(`gemini-2.0-flash:generateContent?key=${Env.GEMINI_API_KEY}`, {
        json: {
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: generateLearningObjectivesSchema,
            topP: 1,
            temperature: 1,
          },
          systemInstruction: {
            parts: [
              {
                text: `As an exceptional, Nobel Prize-winning professor, assist the user in learning the topic by creating a list of learning objectives.
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
            ],
          },
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: request.text,
                },
              ],
            },
          ],
        },
      });
      const result = (await response.json()) as any;
      if (!result) return [];
      return JSON.parse(result.candidates[0].content.parts[0].text).data || [];
    } catch (e) {
      console.error("generateLearningObjectives", e);
      return [];
    }
  }

  public async generateLearningContent(request: GenerateLearningContentRequest): Promise<LearningContent | undefined> {
    try {
      const response = await geminiRequest.post(`gemini-2.0-flash:generateContent?key=${Env.GEMINI_API_KEY}`, {
        json: {
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: generateLearningContentSchema,
            topP: 1,
            temperature: 1,
          },
          systemInstruction: {
            parts: [
              {
                text: `The user provides a list of learning objectives for a topic. A target objective that he/she want to learn is also provided. As an exceptional, Nobel Prize-winning professor, assist the user in learning the objective by writing up a roughly 1000-word piece of content with a list of citations to back up the detail. The citation can be from easily accessible sources like wikipedia, to academic resources like research papers, academic books/articles. The content should be split into pieces along side their respective citations.`,
              },
            ],
          },
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `Learning objectives: ${request.learningObjectives.map((item) => item.text).join(", ")}. Target objective: ${request.targetObjective.text}`,
                },
              ],
            },
          ],
        },
      });
      const result = (await response.json()) as any;
      if (!result) return;
      return JSON.parse(result.candidates[0].content.parts[0].text).data;
    } catch (e) {
      console.error("generateLearningContent", e);
      return;
    }
  }
}

export const geminiService = new GeminiService();
