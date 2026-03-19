export type MplusBeacon = {
  id: string;
  distance: number;
  questionId: string;
  parent: string | null;
  children: string[];
  f: number;
  importance: number;
  type: string[];
};
