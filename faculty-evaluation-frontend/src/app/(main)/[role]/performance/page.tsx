//src/app/(main)/[role]/performance/page.tsx
import { PerformanceTable } from "@/components/faculty";
import { getConfigByRole } from "@/config";
import { MOCK_FACULTY_INFO, MOCK_PERFORMANCE_SCORES } from "@/data/mock-data";
import type { RoleType } from "@/config";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ role: string }>;
};

export default async function PerformancePage({ params }: Props) {
  const { role } = await params;

  if (role !== "fulltime" && role !== "parttime") {
    notFound();
  }

  const config = getConfigByRole(role as RoleType);
  const facultyInfo = MOCK_FACULTY_INFO[role as RoleType];

  return (
    <PerformanceTable
      config={config}
      facultyInfo={facultyInfo}
      scores={MOCK_PERFORMANCE_SCORES}
    />
  );
}
