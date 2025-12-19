"use client";

import React from "react";

// Mock utility for preview environment
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "white" | "slate";
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  color = "primary",
  className,
}) => {
  const sizes = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-2",
    lg: "w-12 h-12 border-3",
  };

  const colors = {
    primary: "border-primary-light/30 border-t-primary",
    white: "border-white/30 border-t-white",
    slate: "border-text-muted/30 border-t-text-secondary",
  };

  return (
    <div
      className={cn(
        "rounded-full animate-spin",
        sizes[size],
        colors[color],
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );
};

LoadingSpinner.displayName = "LoadingSpinner";

// Full page loading component
export interface LoadingPageProps {
  message?: string;
}

const LoadingPage: React.FC<LoadingPageProps> = ({
  message = "読み込み中...",
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <LoadingSpinner size="lg" />
      <p className="text-text-secondary text-sm">{message}</p>
    </div>
  );
};

LoadingPage.displayName = "LoadingPage";

export { LoadingSpinner, LoadingPage };
