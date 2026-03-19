export type FlowStep = {
  questionId: string;
  answer: string;
  correct: boolean;
  comment?: string;
  importance: number;
};

export type QuizFlow = {
  id: string;
  O: {
    finishedAt: string;
    score: number;
    importance: number;
    f: number;
  };
  steps: FlowStep[];
  type: string[];
};
