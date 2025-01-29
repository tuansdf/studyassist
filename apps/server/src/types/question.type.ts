export type GenerateQuestionsRequest = {
  text: string;
  numOfQuestion: number;
  isMultipleChoice: boolean;
  optionsPerQuestion: number;
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
  isCorrect: boolean;
};
