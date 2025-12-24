import { SummaryTable } from "@/components/faculty";
import { getConfigByRole } from "@/config";
import { MOCK_SUMMARY_DATA } from "@/data/mock-data";
import type { RoleType } from "@/config";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ role: string }>;
};

export default async function SummaryPage({ params }: Props) {
  const { role } = await params;

  if (role !== "fulltime" && role !== "parttime") {
    notFound();
  }

  const config = getConfigByRole(role as RoleType);

  return <SummaryTable config={config} data={MOCK_SUMMARY_DATA} />;
}
