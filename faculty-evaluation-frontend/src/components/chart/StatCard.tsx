"use client";

import React from "react";
import { cn } from "@/utils/cn";

export interface StatCardProps {
  label: string;
  value: number | string;
  maxValue?: number;
  suffix?: string;
  variant?: "default" | "primary" | "success" | "warning";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  maxValue,
  suffix,
  variant = "default",
  size = "md",
  className,
}) => {
  const variants = {
    default: "bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200",
    primary:
      "bg-gradient-to-br from-primary-lightest to-primary-lightest/50 border-primary-light/50",
    success:
      "bg-gradient-to-br from-emerald-50 to-teal-50 border-success-light",
    warning:
      "bg-gradient-to-br from-amber-50 to-orange-50 border-warning-light",
  };

  const textColors = {
    default: "text-slate-800",
    primary: "text-primary-dark",
    success: "text-success-dark",
    warning: "text-warning-dark",
  };

  const labelColors = {
    default: "text-slate-600",
    primary: "text-text-primary",
    success: "text-success-dark",
    warning: "text-warning-dark",
  };

  const sizes = {
    sm: "p-3",
    md: "p-4",
    lg: "p-5",
  };

  const valueSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  const labelSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div
      className={cn(
        "rounded-xl border-2",
        "transition-all duration-200",
        "hover:shadow-md hover:scale-[1.02]",
        variants[variant],
        sizes[size],
        className
      )}
    >
      <div
        className={cn(
          "font-semibold mb-1",
          labelSizes[size],
          labelColors[variant]
        )}
      >
        {label}
      </div>
      <div
        className={cn(
          "font-bold tabular-nums",
          valueSizes[size],
          textColors[variant]
        )}
      >
        {value}
        {maxValue !== undefined && (
          <span className="text-sm font-normal opacity-60"> / {maxValue}</span>
        )}
        {suffix && <span className="text-sm font-normal ml-1">{suffix}</span>}
      </div>
    </div>
  );
};

StatCard.displayName = "StatCard";

export { StatCard };
