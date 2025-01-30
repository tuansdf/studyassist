import {
  GenerateDiagramRequest,
  GenerateLearningObjectivesRequest,
  GenerateQuestionsRequest,
  LearningObjective,
  Question,
} from "../../types/question.type.js";

export interface AiService {
  generateQuestions: (request: GenerateQuestionsRequest) => Promise<Question[]>;
  generateDiagram: (request: GenerateDiagramRequest) => Promise<string>;
  generateLearningObjectives: (request: GenerateLearningObjectivesRequest) => Promise<LearningObjective[]>;
}
