export type RQuestion = {
  id: string;
  beaconId: string;
  code: string;
  question: string;
  correct: string;
  wrong: string[];
  comments: string[];
  importance: number;
  f: number;
  tags?: string[];
  principleId?: string;
};
