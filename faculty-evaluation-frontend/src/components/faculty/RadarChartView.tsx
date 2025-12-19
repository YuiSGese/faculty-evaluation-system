"use client";

import React from "react";
import { RadarChartWithStats } from "@/components/chart";
import type { FacultyConfig } from "@/config";
import type { RadarCategory } from "@/types/chart";

interface RadarChartViewProps {
  config: FacultyConfig;
  data: Record<string, number>;
}

export function RadarChartView({ config, data }: RadarChartViewProps) {
  const categories: RadarCategory[] = config.radar.categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    value: data[cat.id] || 0,
    maxValue: cat.maxValue,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center p-5">
      <RadarChartWithStats
        title={config.titleRadar}
        categories={categories}
        legendLabel="今年度の評価"
        statsColumns={config.radar.axes <= 6 ? 3 : 4}
        className="max-w-[600px] w-full"
      />
    </div>
  );
}
