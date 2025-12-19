"use client";

import React from "react";
import { cn } from "@/utils/cn";

export interface InfoField {
  id: string;
  label: string;
  value: string;
  colSpan?: number;
}

export interface InfoSectionProps {
  title?: string;
  fields: InfoField[];
  columns?: number;
  variant?: "default" | "bordered" | "card";
  className?: string;
  editable?: boolean;
  onChange?: (fieldId: string, value: string) => void;
}

const InfoSection: React.FC<InfoSectionProps> = ({
  title,
  fields,
  columns = 2,
  variant = "default",
  className,
  editable = false,
  onChange,
}) => {
  const variants = {
    default: "bg-blue-100/50 border-l-4 border-info-dark",
    bordered: "border-2 border-primary-light/20 bg-white",
    card: "bg-white shadow-md border border-primary-light/20",
  };

  const gridCols: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5",
    6: "grid-cols-1 sm:grid-cols-3 lg:grid-cols-6",
  };

  const activeGridClass = gridCols[columns] || gridCols[4];

  return (
    <div className={cn("rounded-lg p-4", variants[variant], className)}>
      {title && (
        <h3 className="text-sm font-semibold text-text-secondary mb-3">
          {title}
        </h3>
      )}
      <div className={cn("grid gap-4", activeGridClass)}>
        {fields.map((field) => (
          <div
            key={field.id}
            className={cn(
              "flex items-center gap-3",
              field.colSpan && `sm:col-span-${field.colSpan}`
            )}
          >
            <span className="text-sm font-bold text-text-primary whitespace-nowrap min-w-fit">
              {field.label}
            </span>

            {editable ? (
              <input
                type="text"
                value={field.value}
                onChange={(e) => onChange?.(field.id, e.target.value)}
                className={cn(
                  "flex-1 px-3 py-1.5 text-sm text-text-primary",
                  "bg-white border border-primary-light/20 rounded",
                  "focus:outline-none focus:ring-2 focus:ring-primary-light/20 focus:border-primary"
                )}
              />
            ) : (
              <span
                className={cn(
                  "flex-1 px-3 py-1.5 text-sm text-text-primary",
                  "bg-white border border-primary-light/20 rounded",
                  "min-w-[100px]"
                )}
              >
                {field.value || "\u00A0"}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

InfoSection.displayName = "InfoSection";

export { InfoSection };
