// src/components/ui/PageHeader.tsx
import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  year?: number | string;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  badge,
  year,
  className = "",
}: PageHeaderProps) {
  const displayBadge = year ? <>年度: {year}</> : badge;

  return (
    <div
      className={`border-b border-primary-light/30 pb-4 mt-6 mb-6 ${className}`}
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        {/* Title & Subtitle Section (Left) */}
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary">
            {title}
          </h1>
          {subtitle && (
            <p className="text-text-muted text-sm md:text-base">{subtitle}</p>
          )}
        </div>

        {/* Badge Section (Right) */}
        {displayBadge && (
          <div className="flex-shrink-0">
            <div className="px-4 py-2 bg-background-subtle border border-primary-light/30 rounded text-sm font-semibold text-text-secondary">
              {displayBadge}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
