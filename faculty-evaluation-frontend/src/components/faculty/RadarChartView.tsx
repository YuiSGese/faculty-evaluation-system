"use client";

import React from "react";
import { RadarChartWithStats } from "@/components/chart";
import type { FacultyConfig } from "@/config";
import type { RadarCategory } from "@/types/chart";
import { PageHeader } from "@/components/ui/PageHeader";

interface RadarChartViewProps {
  config: FacultyConfig;
  data: Record<string, number>;
}
const currentYear = new Date().getFullYear();

export function RadarChartView({ config, data }: RadarChartViewProps) {
  const categories: RadarCategory[] = config.radar.categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    value: data[cat.id] || 0,
    maxValue: cat.maxValue,
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title={config.titleRadar}
        //subtitle="教員の評価"
        year={currentYear}
      />

      <div className="min-h-[500px] bg-gradient-to-br from-primary-lightest/30 to-white flex items-center justify-center p-5 rounded-xl border border-primary-light/20 shadow-sm">
        <RadarChartWithStats
          // title={config.titleRadar} // Có thể bỏ title ở đây nếu PageHeader đã hiển thị, hoặc giữ lại nếu muốn tiêu đề riêng cho biểu đồ
          categories={categories}
          legendLabel="今年度の評価"
          statsColumns={config.radar.axes <= 6 ? 3 : 4}
          className="max-w-[600px] w-full"
        />
      </div>
    </div>
  );
}
