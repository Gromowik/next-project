import type { QuizHost } from "@/phenomenal/types/host";
import type { MplusBeacon } from "@/phenomenal/types/mplus";
import type { RQuestion } from "@/phenomenal/types/r";
import type { RfPrinciple } from "@/phenomenal/types/rf";

export type QuizSeedLike = {
  host: QuizHost;
  mplus: MplusBeacon[];
  r: RQuestion[];
  rf: RfPrinciple[];
  flows: unknown[];
};

type Severity = "error" | "warning";

export type SeedValidationIssue = {
  severity: Severity;
  code: string;
  message: string;
};

export type SeedValidationResult = {
  ok: boolean;
  errorCount: number;
  warningCount: number;
  issues: SeedValidationIssue[];
};

function duplicateValues(values: string[]) {
  const counts = new Map<string, number>();

  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return [...counts.entries()]
    .filter(([, count]) => count > 1)
    .map(([value]) => value);
}

export function validateQuizSeed(seed: QuizSeedLike): SeedValidationResult {
  const issues: SeedValidationIssue[] = [];

  const beaconIds = seed.mplus.map((item) => item.id);
  const questionIds = seed.r.map((item) => item.id);
  const principleIds = seed.rf.map((item) => item.id);

  const beaconIdSet = new Set(beaconIds);
  const questionIdSet = new Set(questionIds);
  const principleIdSet = new Set(principleIds);

  const duplicatedBeaconIds = duplicateValues(beaconIds);
  const duplicatedQuestionIds = duplicateValues(questionIds);
  const duplicatedPrincipleIds = duplicateValues(principleIds);

  for (const id of duplicatedBeaconIds) {
    issues.push({
      severity: "error",
      code: "DUPLICATE_BEACON_ID",
      message: `M+ beacon id is duplicated: ${id}`,
    });
  }

  for (const id of duplicatedQuestionIds) {
    issues.push({
      severity: "error",
      code: "DUPLICATE_QUESTION_ID",
      message: `R question id is duplicated: ${id}`,
    });
  }

  for (const id of duplicatedPrincipleIds) {
    issues.push({
      severity: "error",
      code: "DUPLICATE_PRINCIPLE_ID",
      message: `Rf principle id is duplicated: ${id}`,
    });
  }

  const rootBeacons = seed.mplus.filter((item) => item.parent === null);
  if (rootBeacons.length === 0) {
    issues.push({
      severity: "error",
      code: "MPLUS_ROOT_MISSING",
      message: "M+ tree has no root beacon (parent=null).",
    });
  }

  if (rootBeacons.length > 1) {
    issues.push({
      severity: "warning",
      code: "MPLUS_MULTIPLE_ROOTS",
      message: `M+ tree has multiple roots: ${rootBeacons.map((item) => item.id).join(", ")}`,
    });
  }

  if (!rootBeacons.find((item) => item.id === "mplus-root")) {
    issues.push({
      severity: "warning",
      code: "MPLUS_ROOT_ID_CONVENTION",
      message: "Convention warning: no beacon with id 'mplus-root' found.",
    });
  }

  for (const beacon of seed.mplus) {
    if (beacon.parent && !beaconIdSet.has(beacon.parent)) {
      issues.push({
        severity: "error",
        code: "MPLUS_PARENT_NOT_FOUND",
        message: `Beacon ${beacon.id} references missing parent ${beacon.parent}.`,
      });
    }

    for (const childId of beacon.children) {
      if (!beaconIdSet.has(childId)) {
        issues.push({
          severity: "error",
          code: "MPLUS_CHILD_NOT_FOUND",
          message: `Beacon ${beacon.id} references missing child ${childId}.`,
        });
      }
    }

    if (!questionIdSet.has(beacon.questionId)) {
      issues.push({
        severity: "error",
        code: "MPLUS_QUESTION_NOT_FOUND",
        message: `Beacon ${beacon.id} references missing question ${beacon.questionId}.`,
      });
    }
  }

  for (const question of seed.r) {
    if (!beaconIdSet.has(question.beaconId)) {
      issues.push({
        severity: "error",
        code: "QUESTION_BEACON_NOT_FOUND",
        message: `Question ${question.id} references missing beacon ${question.beaconId}.`,
      });
    }

    const linkedBeacon = seed.mplus.find((item) => item.id === question.beaconId);
    if (linkedBeacon && linkedBeacon.questionId !== question.id) {
      issues.push({
        severity: "error",
        code: "QUESTION_BEACON_MISMATCH",
        message: `Question ${question.id} and beacon ${question.beaconId} mismatch: beacon.questionId=${linkedBeacon.questionId}.`,
      });
    }

    if (question.principleId && !principleIdSet.has(question.principleId)) {
      issues.push({
        severity: "error",
        code: "QUESTION_PRINCIPLE_NOT_FOUND",
        message: `Question ${question.id} references missing principle ${question.principleId}.`,
      });
    }

    if (!question.wrong.length) {
      issues.push({
        severity: "warning",
        code: "QUESTION_NO_WRONG_ANSWERS",
        message: `Question ${question.id} has no wrong answers.`,
      });
    }
  }

  for (const beacon of seed.mplus) {
    const linkedQuestion = seed.r.find((item) => item.id === beacon.questionId);
    if (linkedQuestion && linkedQuestion.beaconId !== beacon.id) {
      issues.push({
        severity: "error",
        code: "BEACON_QUESTION_MISMATCH",
        message: `Beacon ${beacon.id} and question ${linkedQuestion.id} mismatch: question.beaconId=${linkedQuestion.beaconId}.`,
      });
    }
  }

  const errorCount = issues.filter((item) => item.severity === "error").length;
  const warningCount = issues.filter((item) => item.severity === "warning").length;

  return {
    ok: errorCount === 0,
    errorCount,
    warningCount,
    issues,
  };
}

export function formatSeedValidationReport(result: SeedValidationResult): string {
  if (result.issues.length === 0) {
    return "Seed validation passed: no issues.";
  }

  const lines = [
    `Seed validation: ${result.errorCount} error(s), ${result.warningCount} warning(s).`,
    ...result.issues.map((issue) => `- [${issue.severity.toUpperCase()}] ${issue.code}: ${issue.message}`),
  ];

  return lines.join("\n");
}
