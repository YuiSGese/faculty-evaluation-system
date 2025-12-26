// src/app/(main)/evaluation/research/page.tsx
import { ResearchRecordTable } from "@/components/evaluation/ResearchRecordTable";
import { MOCK_RESEARCH_RECORD } from "@/data/research-mock-data";

export default function ResearchRecordPage() {
  return <ResearchRecordTable data={MOCK_RESEARCH_RECORD} />;
}
