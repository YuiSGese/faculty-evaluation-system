// src/app/(main)/evaluation/personal/page.tsx
import { PersonalEvaluationTable } from "@/components/evaluation/PersonalEvaluationTable";
import { MOCK_PERSONAL_EVALUATION } from "@/data/personal-mock-data";

export default function PersonalEvaluationPage() {
  return <PersonalEvaluationTable data={MOCK_PERSONAL_EVALUATION} />;
}
