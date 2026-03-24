import { projectTree } from "@/phenomenal/project/project-tree";
import { projectQuestions } from "@/phenomenal/project/project-questions";
import { validateQuizSeed, type QuizSeedLike } from "@/phenomenal/db/validate-seed";

/**
 * Seed для квиза о структуре проекта.
 * Используется ProjectQuizPage для валидации целостности данных.
 * rf (принципы) не используются в project-режиме — пустой массив.
 */
export const projectSeed: QuizSeedLike = {
  host: {
    id: "project-quiz-1",
    O: {
      name: "Projekt-Struktur Quiz",
      description: "Lerne die Architektur dieses Next.js-Projekts kennen.",
      image: "/quiz-cover.png",
    },
    type: ["phenomenal", "host"],
  },
  mplus: projectTree,
  r: projectQuestions,
  rf: [],
  flows: [],
};

export const projectSeedValidation = validateQuizSeed(projectSeed);
