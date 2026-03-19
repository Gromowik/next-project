import { quizSeed } from "./seed";

export async function loadQuizLayers() {
  // Здесь будет реальная подкачка из БД.
  return Promise.resolve(quizSeed);
}
