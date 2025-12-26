"use client";

import React, { useMemo } from "react";
import { cn } from "@/utils/cn";
import { calculateRadarPoint, calculatePercentage } from "@/utils/calculation";
import type { RadarCategory, RadarChartConfig } from "@/types";
import { DEFAULT_RADAR_CONFIG } from "@/types";

export interface RadarChartProps {
  categories: RadarCategory[];
  config?: Partial<RadarChartConfig>;
  title?: string;
  className?: string;
}

const CENTER = 200;
const MAX_RADIUS = 140;

const RadarChart: React.FC<RadarChartProps> = ({
  categories,
  config: customConfig,
  title,
  className,
}) => {
  const config = { ...DEFAULT_RADAR_CONFIG, ...customConfig };
  const { gridLevels, showLabels, showGrid } = config;

  const totalAxes = categories.length;

  // Generate grid circles
  const gridCircles = useMemo(() => {
    return Array.from({ length: gridLevels }, (_, i) => {
      const radius = ((i + 1) / gridLevels) * MAX_RADIUS;
      const isMajor = i === gridLevels - 1;
      return { radius, isMajor };
    });
  }, [gridLevels]);

  // Generate axis lines
  const axisLines = useMemo(() => {
    return categories.map((_, index) => {
      const point = calculateRadarPoint(
        CENTER,
        CENTER,
        MAX_RADIUS,
        index,
        totalAxes
      );
      return { x2: point.x - CENTER, y2: point.y - CENTER };
    });
  }, [categories, totalAxes]);

  // Generate data points
  const dataPoints = useMemo(() => {
    return categories.map((category, index) => {
      const percentage = calculatePercentage(category.value, category.maxValue);
      const radius = (percentage / 100) * MAX_RADIUS;
      const point = calculateRadarPoint(
        CENTER,
        CENTER,
        radius,
        index,
        totalAxes
      );
      return {
        x: point.x - CENTER,
        y: point.y - CENTER,
        category,
      };
    });
  }, [categories, totalAxes]);

  // Generate label positions
  const labelPositions = useMemo(() => {
    const labelOffset = 30;
    return categories.map((category, index) => {
      const point = calculateRadarPoint(
        CENTER,
        CENTER,
        MAX_RADIUS + labelOffset,
        index,
        totalAxes
      );
      return { x: point.x - CENTER, y: point.y - CENTER, name: category.name };
    });
  }, [categories, totalAxes]);

  // Generate scale labels
  const scaleLabels = useMemo(() => {
    return Array.from({ length: gridLevels + 1 }, (_, i) => {
      const percentage = (i / gridLevels) * 100;
      const y = -(i / gridLevels) * MAX_RADIUS;
      return { y, label: `${percentage}%` };
    });
  }, [gridLevels]);

  return (
    <div className={cn("flex flex-col items-center", className)}>
      {title && (
        <h3 className="text-xl font-bold text-primary-dark mb-4">{title}</h3>
      )}

      <svg viewBox="0 0 400 400" className="w-full h-full">
        <defs>
          <linearGradient
            id="primaryGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              className="[stop-color:var(--color-primary)]"
              stopOpacity="0.3"
            />
            <stop
              offset="100%"
              className="[stop-color:var(--color-primary-light)]"
              stopOpacity="0.1"
            />
          </linearGradient>
        </defs>

        <g transform="translate(200, 200)">
          {/* Grid circles */}
          {showGrid &&
            gridCircles.map(({ radius, isMajor }, index) => (
              <circle
                key={index}
                cx={0}
                cy={0}
                r={radius}
                fill="none"
                className={
                  isMajor
                    ? "stroke-primary-light/40"
                    : "stroke-primary-light/20"
                }
                strokeWidth={isMajor ? 2 : 1}
              />
            ))}

          {/* Axis lines */}
          {axisLines.map((line, index) => (
            <line
              key={index}
              x1={0}
              y1={0}
              x2={line.x2}
              y2={line.y2}
              className="stroke-primary-light"
              strokeWidth={2}
            />
          ))}

          {/* Data area */}
          <polygon
            points={dataPoints.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="url(#primaryGradient)"
            className="stroke-primary"
            strokeWidth={3}
            style={{ transition: "all 0.5s ease-out" }}
          />

          {/* Data points */}
          {dataPoints.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r={6}
              className="fill-primary stroke-white"
              strokeWidth={2}
              style={{
                transition: "all 0.5s ease-out",
                cursor: "pointer",
              }}
            >
              <title>
                {point.category.name}: {point.category.value} /{" "}
                {point.category.maxValue}
              </title>
            </circle>
          ))}

          {/* Labels */}
          {showLabels &&
            labelPositions.map((label, index) => (
              <text
                key={index}
                x={label.x}
                y={label.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-sm font-semibold fill-text-primary"
              >
                {label.name}
              </text>
            ))}

          {/* Scale labels */}
          {scaleLabels.map((scale, index) => (
            <text
              key={index}
              x={0}
              y={scale.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs fill-primary-light"
            >
              {scale.label}
            </text>
          ))}
        </g>
      </svg>
    </div>
  );
};

RadarChart.displayName = "RadarChart";

export { RadarChart };
