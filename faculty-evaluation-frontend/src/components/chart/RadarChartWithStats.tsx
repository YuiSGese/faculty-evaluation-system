"use client";

import React from "react";
import { cn } from "@/utils/cn";
import { RadarChart } from "./RadarChart";
import { StatsGrid } from "./StatsGrid";
import type { RadarCategory, RadarChartConfig } from "@/types";

export interface RadarChartWithStatsProps {
  categories: RadarCategory[];
  config?: Partial<RadarChartConfig>;
  title?: string;
  showLegend?: boolean;
  legendLabel?: string;
  statsColumns?: 2 | 3 | 4 | 6;
  className?: string;
}

const RadarChartWithStats: React.FC<RadarChartWithStatsProps> = ({
  categories,
  config,
  title,
  showLegend = true,
  legendLabel = "今年度の評価",
  statsColumns,
  className,
}) => {
  // Determine default columns based on category count
  const defaultColumns =
    categories.length <= 4 ? 4 : categories.length <= 6 ? 3 : 4;
  const columns = statsColumns || defaultColumns;

  return (
    <div
      className={cn(
        "bg-white/95 backdrop-blur-sm",
        "rounded-2xl p-6 md:p-8",
        "shadow-xl",
        className
      )}
    >
      {title && (
        <h2 className="text-2xl font-bold text-primary-darktext-center mb-6">
          {title}
        </h2>
      )}

      {/* Radar Chart */}
      <div className="flex justify-center mb-6">
        <RadarChart
          categories={categories}
          config={config}
          className="w-full max-w-md"
        />
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 text-sm text-primary font-medium">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span>{legendLabel}</span>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <StatsGrid
        categories={categories}
        columns={columns as 2 | 3 | 4 | 6}
        variant="primary"
        size="md"
      />
    </div>
  );
};

RadarChartWithStats.displayName = "RadarChartWithStats";

export { RadarChartWithStats };
