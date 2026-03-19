"use client";

import { useMemo, useState } from "react";
import { findQuestionById } from "@/phenomenal/r/find-by-id";
import type { FlowStep } from "@/phenomenal/types/flow";
import type { MplusBeacon } from "@/phenomenal/types/mplus";

function hashString(value: string): number {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
}

function rotateBySeed(items: string[], seed: string): string[] {
  if (items.length <= 1) return items;
  const offset = hashString(seed) % items.length;
  return [...items.slice(offset), ...items.slice(0, offset)];
}

type Props = {
  beacon: MplusBeacon;
  onAnswer: (payload: { answer: string; comment?: string; importance?: number }) => void;
  step?: FlowStep;
  readonly?: boolean;
};

export function QuizCard({ beacon, onAnswer, step, readonly = false }: Props) {
  const question = findQuestionById(beacon.questionId);
  const [selectedAnswer, setSelectedAnswer] = useState<string>(step?.answer ?? "");
  const [comment, setComment] = useState("");
  const [importance, setImportance] = useState(step?.importance ?? 1);

  const answers = useMemo(
    () => {
      if (!question) return [];
      return rotateBySeed([question.correct, ...question.wrong], question.id);
    },
    [question]
  );

  if (!question) return null;

  const handleSubmit = () => {
    if (!selectedAnswer || readonly) return;

    onAnswer({
      answer: selectedAnswer,
      comment: comment.trim() || undefined,
      importance,
    });

    setSelectedAnswer("");
    setComment("");
    setImportance(1);
  };

  return (
    <div className="space-y-4 rounded-xl bg-white p-6 text-slate-900 shadow-lg">
      {readonly && (
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-slate-500">Abgeschlossener Schritt</span>
          <span className={step?.correct ? "font-semibold text-green-700" : "font-semibold text-red-700"}>
            {step?.correct ? "Richtig" : "Falsch"}
          </span>
        </div>
      )}

      <pre className="overflow-auto rounded bg-gray-100 p-3 text-sm text-slate-900">
        {question.code}
      </pre>
      <h2 className="text-xl font-semibold text-slate-900">{question.question}</h2>

      <div className="space-y-2">
        {answers.map((answer) => (
          <button
            key={answer}
            type="button"
            onClick={() => {
              if (!readonly) {
                setSelectedAnswer(answer);
              }
            }}
            disabled={readonly}
            className={`w-full rounded-lg p-3 text-left transition ${
              selectedAnswer === answer
                ? readonly
                  ? step?.correct
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                  : "bg-blue-600 text-white"
                : readonly && answer === question.correct
                  ? "bg-green-100 text-green-900"
                  : "bg-blue-100 text-slate-900 hover:bg-blue-200"
            }`}
          >
            {answer}
          </button>
        ))}
      </div>

      {readonly ? (
        <div className="space-y-2 rounded-lg bg-slate-50 p-4">
          <div>
            <p className="text-sm font-medium text-slate-600">Kommentar</p>
            <p className="mt-1 text-slate-900">{step?.comment?.trim() || "—"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-600">Wichtigkeit</p>
            <p className="mt-1 text-slate-900">{step?.importance ?? 1}</p>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Kommentar zur Frage
            </label>
            <textarea
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Was war klar und wo gab es Zweifel?"
              className="min-h-24 w-full rounded-lg border border-gray-300 bg-white p-3 text-slate-900 placeholder:text-gray-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Wichtigkeit
            </label>
            <select
              value={importance}
              onChange={(event) => setImportance(Number(event.target.value))}
              className="w-full rounded-lg border border-gray-300 bg-white p-3 text-slate-900"
            >
              {Array.from({ length: 10 }, (_, index) => index + 1).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className="w-full rounded-lg bg-green-600 px-4 py-3 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            Antwort bestätigen
          </button>
        </>
      )}
    </div>
  );
}
