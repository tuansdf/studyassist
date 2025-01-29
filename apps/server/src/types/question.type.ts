export type GenerateQuestionsRequest = {
  text: string;
  numOfQuestion: number;
  isMultipleChoice: boolean;
  optionsPerQuestion: number;
};

export type Question = {
  text: string;
  answers: Answer[];
};

export type Answer = {
  text: string;
  isCorrect: boolean;
};
