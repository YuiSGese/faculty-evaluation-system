"use client";

import React from "react";

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export interface YearSelectorProps {
  value: number;
  onChange?: (year: number) => void;
  minYear?: number;
  maxYear?: number;
  label?: string;
  readonly?: boolean;
  variant?: "default" | "bordered" | "compact";
  className?: string;
}

const YearSelector: React.FC<YearSelectorProps> = ({
  value,
  onChange,
  minYear = 2020,
  maxYear = new Date().getFullYear() + 1,
  label = "年度",
  readonly = false,
  variant = "default",
  className,
}) => {
  const years = Array.from(
    { length: maxYear - minYear + 1 },
    (_, i) => maxYear - i
  );

  const variants = {
    default: "px-4 py-2 border-2 border-primary bg-white text-text-primary",
    bordered:
      "px-4 py-2 border border-primary-light/30 bg-background-subtle text-text-primary",
    compact:
      "px-3 py-1.5 border border-primary-light/30 bg-white text-sm text-text-primary",
  };

  if (readonly) {
    return (
      <div className={cn("inline-flex items-center gap-2", className)}>
        <span className="font-semibold text-text-secondary">{label}</span>
        <span className={cn("rounded font-medium", variants[variant])}>
          {value}
        </span>
      </div>
    );
  }

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <span className="font-semibold text-text-secondary">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange?.(parseInt(e.target.value))}
        className={cn(
          "rounded font-medium",
          "focus:outline-none focus:ring-2 focus:ring-primary-light/30",
          variants[variant]
        )}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

YearSelector.displayName = "YearSelector";

export { YearSelector };
