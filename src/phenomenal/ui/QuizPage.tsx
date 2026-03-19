'use client';

import { useEffect, useMemo, useRef, useState } from "react";
import { quizSeed } from "@/phenomenal/db/seed";
import {
  formatSeedValidationReport,
  type SeedValidationResult,
  validateQuizSeed,
} from "@/phenomenal/db/validate-seed";
import { saveFlow, getSavedFlows } from "@/phenomenal/db/save";
import { flowsApi } from "@/phenomenal/api/flows.api";
import { saveFlowAction } from "@/app/actions/flows.actions";
import type { QuizFlow } from "@/phenomenal/types/flow";
import { answerQuestion } from "@/phenomenal/engine/answer";
import { finishQuiz } from "@/phenomenal/engine/finish";
import { nextStep } from "@/phenomenal/engine/next";
import { flows } from "@/phenomenal/flows/flows";
import { mplusTree } from "@/phenomenal/mplus/tree";
import { findBeaconByQuestionId } from "@/phenomenal/mplus/tree";
import { findQuestionById } from "@/phenomenal/r/find-by-id";
import { questions } from "@/phenomenal/r/questions";
import { startQuiz } from "@/phenomenal/engine/start";
import type { QuizState } from "@/phenomenal/types/engine";
import { FlowSummary } from "./FlowSummary";
import { Footer } from "./Footer";
import { Layout } from "./Layout";
import { Navbar } from "./Navbar";
import { PrincipleCard } from "./PrincipleCard";
import { QuizCard } from "./QuizCard";
import { StartScreen } from "./StartScreen";

export function QuizPage() {
  const [state, setState] = useState<QuizState | null>(null);
  // Намеренно [] — не читаем localStorage при инициализации, чтобы сервер и клиент
  // рендерили одинаковое начальное состояние и не было hydration mismatch.
  const [savedFlows, setSavedFlows] = useState<QuizFlow[]>([]);
  const [seedCheck, setSeedCheck] = useState<SeedValidationResult | null>(null);
  const [seedReport, setSeedReport] = useState("");
  const activeRef = useRef<HTMLDivElement | null>(null);
  const isDev = process.env.NODE_ENV === "development";

  // Загружаем flows с сервера при монтировании (после hydration).
  // Если пользователь не авторизован — берём из localStorage как fallback.
  useEffect(() => {
    flowsApi.list().then((result) => {
      if (result.ok) {
        setSavedFlows(result.flows);
      } else {
        setSavedFlows(getSavedFlows());
      }
    });
  }, []);

  useEffect(() => {
    if (!state) return;

    activeRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [state?.steps.length, state?.currentBeacon?.id, state?.finished]);

  const fillTopCards = (items: Array<{ title: string; value: string; meta: string }>, emptyLabel: string) => {
    const filled = [...items];

    while (filled.length < 5) {
      filled.push({
        title: `${emptyLabel} ${filled.length + 1}`,
        value: "—",
        meta: "Noch keine Daten vorhanden",
      });
    }

    return filled.slice(0, 5);
  };

  const onStart = () => setState(startQuiz("weighted"));

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
      // Server Action вызывается как обычная функция — без fetch() вручную
      void saveFlowAction(flow, sequence).then((result) => {
        if (result.ok) {
          // Сервер принял — перезагружаем список с сервера
          return flowsApi.list().then((listResult) => {
            if (listResult.ok) setSavedFlows(listResult.flows);
          });
        }
        // Нет авторизации или ошибка БД — сохраняем в localStorage
        return saveFlow(flow).then(() => {
          setSavedFlows(getSavedFlows());
        });
      });
    }

    // Показываем итог на экране — пользователь сам закроет кнопкой
    setState(completed);
  };

  const currentQuestion = state?.currentBeacon
    ? findQuestionById(state.currentBeacon.questionId)
    : null;

  const onAnswer = (payload: { answer: string; comment?: string; importance?: number }) => {
    if (!state) return;

    const afterAnswer = answerQuestion(state, payload);
    const afterNext = nextStep(afterAnswer);

    // finished явно или нет активного beacon — завершаем поток
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

  const onSeedCheck = () => {
    const validation = validateQuizSeed(quizSeed);
    setSeedCheck(validation);
    setSeedReport(formatSeedValidationReport(validation));
  };

  const historyBeacons = useMemo(() => {
    if (!state) return [];

    return state.steps
      .map((step) => {
        const beacon = findBeaconByQuestionId(step.questionId);

        return { step, beacon };
      })
      .filter((item): item is { step: QuizState["steps"][number]; beacon: NonNullable<QuizState["currentBeacon"]> } => Boolean(item.beacon));
  }, [state]);

  const topBeacons = useMemo(() => {
    return fillTopCards([...mplusTree]
      .sort((left, right) => right.f - left.f || right.importance - left.importance)
      .slice(0, 5)
      .map((beacon) => {
        const question = findQuestionById(beacon.questionId);
        return {
          title: question?.question ?? beacon.id,
          value: `f ${beacon.f}`,
          meta: `Distanz ${beacon.distance} · Wichtigkeit ${beacon.importance}`,
        };
      }), "Beacon");
  }, []);

  const topQuestions = useMemo(() => {
    return fillTopCards([...questions]
      .sort((left, right) => right.importance - left.importance || right.f - left.f)
      .slice(0, 5)
      .map((question) => ({
        title: question.question,
        value: `W ${question.importance}`,
        meta: `f ${question.f} · ${question.tags?.slice(0, 2).join(" / ") ?? "ohne Tags"}`,
      })), "Frage");
  }, []);

  const topFlows = fillTopCards([...savedFlows]
      .sort((left, right) => right.O.importance - left.O.importance || right.O.score - left.O.score)
      .slice(0, 5)
      .map((flow, index) => ({
        title: `Durchlauf ${index + 1}`,
        value: `W ${flow.O.importance}`,
        meta: `${flow.steps.length} Schritte · Score ${flow.O.score}`,
      })), "Durchlauf");

  const navbarActionLabel = state ? "Quizfluss beenden" : "Quiz starten";
  const navbarActionHandler = state ? onFinishFlow : onStart;

  return (
    <Layout>
      <Navbar primaryActionLabel={navbarActionLabel} onPrimaryAction={navbarActionHandler} />

      {!state && (
        <StartScreen
          topBeacons={topBeacons}
          topFlows={topFlows}
          topQuestions={topQuestions}
        />
      )}

      {state && (
        <div className="max-h-[75vh] space-y-5 overflow-y-auto pr-2">
          {historyBeacons.map(({ step, beacon }, index) => (
            <QuizCard
              key={`${step.questionId}-${index}-${step.answer}`}
              beacon={beacon}
              onAnswer={onAnswer}
              step={step}
              readonly
            />
          ))}

          {state.currentBeacon && !state.finished && (
            <div className="space-y-4">
              <div ref={activeRef}>
                {/* key гарантирует чистый remount при смене вопроса — localState сбрасывается */}
                <QuizCard key={state.currentBeacon.id} beacon={state.currentBeacon} onAnswer={onAnswer} />
              </div>
              <PrincipleCard principleId={currentQuestion?.principleId} />
            </div>
          )}

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
        seedCheck={seedCheck}
        seedReport={seedReport}
        onSeedCheck={onSeedCheck}
      />
    </Layout>
  );
}
