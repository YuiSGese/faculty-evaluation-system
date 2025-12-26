import { ScoreTable } from "@/components/faculty";
import { getConfigByRole } from "@/config";
import { MOCK_SCORE_DATA } from "@/data/mock-data";
import type { RoleType } from "@/config";
import { notFound } from "next/navigation";
type Props = {
  params: Promise<{ role: string }>;
};

export default async function ScorePage({ params }: Props) {
  const { role } = await params;

  if (role !== "fulltime" && role !== "parttime") {
    notFound();
  }

  const config = getConfigByRole(role as RoleType);

  return <ScoreTable config={config} data={MOCK_SCORE_DATA} />;
}
