export type GenerateQuestionsRequest = {
  text: string;
  numOfQuestion: number;
  isMultipleChoice: boolean;
  optionsPerQuestion: number;
};

export type GenerateLearningObjectivesRequest = {
  text: string;
};

export type GenerateLearningContentRequest = {
  targetObjective: LearningObjective;
  learningObjectives: LearningObjective[];
};

export type GenerateDiagramRequest = {
  text: string;
  type:
    | "mind-map"
    | "flowchart"
    | "sequence"
    | "class"
    | "state"
    | "entity-relationship"
    | "gantt"
    | "user-journey"
    | "git-commit-history"
    | "pie"
    | "timeline"
    | "sankey"
    | "xy-chart";
};

export type Question = {
  text: string;
  answers: Answer[];
};

export type Answer = {
  text: string;
  correct: boolean;
};

export type LearningObjective = {
  text: string;
};

export type LearningContent = {
  text: string;
  citations: string[];
};
