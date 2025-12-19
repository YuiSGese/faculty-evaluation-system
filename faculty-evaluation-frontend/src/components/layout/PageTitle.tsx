"use client";

import React from "react";

// Mock utility for preview environment
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export interface PageTitleProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  backLink?: {
    label: string;
    href: string;
  };
  className?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({
  title,
  subtitle,
  actions,
  backLink,
  className,
}) => {
  return (
    <div className={cn("mb-6", "border-b-2 border-primary pb-4", className)}>
      {backLink && (
        <a
          href={backLink.href}
          className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-primary mb-2 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {backLink.label}
        </a>
      )}
      <div className="relative w-full">
        <div>
          <h1
            className={cn(
              "text-2xl font-bold text-text-primary",
              "text-center w-full"
            )}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-sm text-text-secondary text-center">
              {subtitle}
            </p>
          )}
        </div>
        {actions && (
          <div className="absolute right-0 top-0 flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

PageTitle.displayName = "PageTitle";

export { PageTitle };
