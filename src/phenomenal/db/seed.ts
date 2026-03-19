import { quizHost } from "@/phenomenal/host/host-object";
import { mplusTree } from "@/phenomenal/mplus/tree";
import { questions } from "@/phenomenal/r/questions";
import { principles } from "@/phenomenal/rf/principles";
import {
  formatSeedValidationReport,
  validateQuizSeed,
  type QuizSeedLike,
} from "./validate-seed";

export const quizSeed: QuizSeedLike = {
  host: quizHost,
  mplus: mplusTree,
  r: questions,
  rf: principles,
  flows: [],
};

export const quizSeedValidation = validateQuizSeed(quizSeed);

export function getQuizSeedValidationReport() {
  return formatSeedValidationReport(quizSeedValidation);
}
