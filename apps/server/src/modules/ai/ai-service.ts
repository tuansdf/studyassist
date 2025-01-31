import {
  GenerateDiagramRequest,
  GenerateLearningContentRequest,
  GenerateLearningObjectivesRequest,
  GenerateQuestionsRequest,
  LearningContent,
  LearningObjective,
  Question,
} from "../../types/question.type.js";

export interface AiService {
  generateQuestions: (request: GenerateQuestionsRequest) => Promise<Question[] | undefined>;
  generateDiagram: (request: GenerateDiagramRequest) => Promise<string | undefined>;
  generateLearningObjectives: (request: GenerateLearningObjectivesRequest) => Promise<LearningObjective[] | undefined>;
  generateLearningContent: (request: GenerateLearningContentRequest) => Promise<LearningContent | undefined>;
}
