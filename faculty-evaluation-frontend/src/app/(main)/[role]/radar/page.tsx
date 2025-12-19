import { RadarChartView } from "@/components/faculty";
import { getConfigByRole } from "@/config";
import { MOCK_RADAR_DATA } from "@/data/mock-data";
import type { RoleType } from "@/config";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ role: string }>;
};

export default async function RadarPage({ params }: Props) {
  const { role } = await params;

  if (role !== "fulltime" && role !== "parttime") {
    notFound();
  }

  const config = getConfigByRole(role as RoleType);
  const data = MOCK_RADAR_DATA[role as RoleType];

  return <RadarChartView config={config} data={data} />;
}
