"use client";

import React from "react";
import { cn } from "@/utils/cn";
import { StatCard } from "./StatCard";
import type { RadarCategory } from "@/types";

export interface StatsGridProps {
  categories: RadarCategory[];
  columns?: 2 | 3 | 4 | 6;
  variant?: "default" | "primary" | "success" | "warning";
  size?: "sm" | "md" | "lg";
  showMaxValue?: boolean;
  className?: string;
}

const StatsGrid: React.FC<StatsGridProps> = ({
  categories,
  columns = 4,
  variant = "primary",
  size = "md",
  showMaxValue = false,
  className,
}) => {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-4",
    6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
  };

  return (
    <div className={cn("grid gap-3", gridCols[columns], className)}>
      {categories.map((category) => (
        <StatCard
          key={category.id}
          label={category.name}
          value={category.value}
          maxValue={showMaxValue ? category.maxValue : undefined}
          variant={variant}
          size={size}
        />
      ))}
    </div>
  );
};

StatsGrid.displayName = "StatsGrid";

export { StatsGrid };
