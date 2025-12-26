// src/app/(main)/evaluation/behavior/page.tsx
import { BehaviorEvaluationTable } from "@/components/evaluation/BehaviorEvaluationTable";
import { MOCK_BEHAVIOR_EVALUATION } from "@/data/behavior-mock-data";

export default function BehaviorEvaluationPage() {
  return <BehaviorEvaluationTable data={MOCK_BEHAVIOR_EVALUATION} />;
}
