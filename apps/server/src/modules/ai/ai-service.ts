import { GenerateQuestionsRequest, Question } from "../../types/question.type.js";

export interface AiService {
  generateQuestions: (request: GenerateQuestionsRequest) => Promise<Question[]>;
}
