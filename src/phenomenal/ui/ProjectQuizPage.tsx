'use client';

import { useEffect, useRef, useState } from "react";
import { saveFlow, getSavedFlows } from "@/phenomenal/db/save";
import { flowsApi } from "@/phenomenal/api/flows.api";
import { saveFlowAction } from "@/app/actions/flows.actions";
import type { QuizFlow } from "@/phenomenal/types/flow";
import { answerQuestion } from "@/phenomenal/engine/answer";
import { finishQuiz } from "@/phenomenal/engine/finish";
import { flows } from "@/phenomenal/flows/flows";
import {
  startProjectQuiz,
  nextProjectStep,
  updateProjectBeaconFrequency,
} from "@/phenomenal/project/project-engine";
import { findProjectBeaconByQuestionId } from "@/phenomenal/project/project-tree";
import { findProjectQuestionById } from "@/phenomenal/project/project-questions";
import { projectSeedValidation } from "@/phenomenal/project/project-seed";
import type { QuizState } from "@/phenomenal/types/engine";
import { FlowSummary } from "./FlowSummary";
import { Footer } from "./Footer";
import { Layout } from "./Layout";
import { Navbar } from "./Navbar";
import { QuizCard } from "./QuizCard";

export function ProjectQuizPage() {
  const [state, setState] = useState<QuizState | null>(null);
  const [savedFlows, setSavedFlows] = useState<QuizFlow[]>([]);
  const activeRef = useRef<HTMLDivElement | null>(null);
  const isDev = process.env.NODE_ENV === "development";

  // Загружаем сохранённые потоки при монтировании
  useEffect(() => {
    flowsApi.list().then((result) => {
      if (result.ok) {
        setSavedFlows(result.flows);
      } else {
        setSavedFlows(getSavedFlows());
      }
    });
  }, []);

  // Автоскролл к активному вопросу
  useEffect(() => {
    if (!state) return;
    activeRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [state?.steps.length, state?.currentBeacon?.id, state?.finished]);

  const onStart = () => setState(startProjectQuiz());

  const completeFlow = (sourceState: QuizState) => {
    if (sourceState.steps.length === 0) {
      setState(null);
      return;
    }

    const completed = finishQuiz(sourceState);
    const flowId = completed.summary?.flowId;
    const flow = flowId ? flows.find((item) => item.id === flowId) : undefined;

    if (flow) {
      const sequence = savedFlows.length + 1;
      void saveFlowAction(flow, sequence).then((result) => {
        if (result.ok) {
          return flowsApi.list().then((listResult) => {
            if (listResult.ok) setSavedFlows(listResult.flows);
          });
        }
        return saveFlow(flow).then(() => setSavedFlows(getSavedFlows()));
      });
    }

    setState(completed);
  };

  const onAnswer = (payload: { answer: string; comment?: string; importance?: number }) => {
    if (!state) return;

    // answerQuestion записывает шаг — side-effects на mplus прошли мимо, это норма
    const afterAnswer = answerQuestion(state, payload);

    // Обновляем частоту в project-tree вручную
    if (state.currentBeacon) {
      updateProjectBeaconFrequency(state.currentBeacon.id);
    }

    const afterNext = nextProjectStep(afterAnswer);

    if (afterNext.finished || !afterNext.currentBeacon) {
      completeFlow(afterNext);
      return;
    }

    setState(afterNext);
  };

  const onFinishFlow = () => {
    if (!state) return;
    completeFlow(state);
  };

  const currentQuestion = state?.currentBeacon
    ? findProjectQuestionById(state.currentBeacon.questionId)
    : null;

  // Для отображения истории ответов
  const historyBeacons = state
    ? state.steps
        .map((step) => {
          const beacon = findProjectBeaconByQuestionId(step.questionId);
          return { step, beacon };
        })
        .filter(
          (item): item is { step: QuizState["steps"][number]; beacon: NonNullable<QuizState["currentBeacon"]> } =>
            Boolean(item.beacon)
        )
    : [];

  const navbarActionLabel = state ? "Quiz beenden" : "Projekt-Quiz starten";
  const navbarActionHandler = state ? onFinishFlow : onStart;

  return (
    <Layout>
      <Navbar primaryActionLabel={navbarActionLabel} onPrimaryAction={navbarActionHandler} />

      {/* Стартовый экран */}
      {!state && (
        <div className="mx-auto max-w-2xl space-y-8 py-12 text-center">
          <div className="space-y-3">
            <div className="text-5xl">🏗️</div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
              Projekt-Struktur Quiz
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400">
              Lerne die Architektur dieses Next.js-Projekts kennen — durch das Quiz der
              eigenen Programmstruktur.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 text-left dark:border-zinc-700 dark:bg-zinc-800/50">
            <h2 className="mb-3 font-semibold text-zinc-700 dark:text-zinc-300">
              Was dich erwartet
            </h2>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li>🗂️ <strong>5 Ebenen</strong> — app, core, phenomenal, modules, shared</li>
              <li>❓ <strong>35+ Fragen</strong> über Dateien, Funktionen und Architekturentscheidungen</li>
              <li>🌳 <strong>Baumnavigation</strong> — das M+-System navigiert durch die Projektstruktur</li>
              <li>💾 <strong>Speicherung</strong> — Ergebnisse werden wie beim normalen Quiz gespeichert</li>
            </ul>
          </div>

          {isDev && !projectSeedValidation.ok && (
            <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-left text-sm text-red-700">
              <strong>Seed-Fehler:</strong> {projectSeedValidation.errorCount} Fehler
            </div>
          )}

          <button
            onClick={onStart}
            className="rounded-xl bg-emerald-600 px-8 py-3 text-white font-semibold hover:bg-emerald-700 transition-colors"
          >
            Quiz starten →
          </button>

          <p className="text-xs text-zinc-400">
            Das Quiz verwendet dasselbe M+-Baumnavigationssystem wie der reguläre Quiz.
          </p>
        </div>
      )}

      {/* Активный квиз */}
      {state && (
        <div className="max-h-[75vh] space-y-5 overflow-y-auto pr-2">
          {/* Пройденные вопросы (readonly) */}
          {historyBeacons.map(({ step, beacon }, index) => (
            <QuizCard
              key={`${step.questionId}-${index}-${step.answer}`}
              beacon={beacon}
              onAnswer={onAnswer}
              step={step}
              readonly
            />
          ))}

          {/* Текущий активный вопрос */}
          {state.currentBeacon && !state.finished && (
            <div ref={activeRef}>
              <QuizCard
                key={state.currentBeacon.id}
                beacon={state.currentBeacon}
                onAnswer={onAnswer}
              />
            </div>
          )}

          {/* Итоговый экран */}
          {state.finished && state.summary && (
            <FlowSummary
              score={state.summary.score}
              importance={state.summary.importance}
              savedCount={savedFlows.length}
              onClose={() => setState(null)}
            />
          )}
        </div>
      )}

      <Footer
        isDev={isDev}
        seedCheck={null}
        seedReport=""
        onSeedCheck={() => {}}
      />
    </Layout>
  );
}
