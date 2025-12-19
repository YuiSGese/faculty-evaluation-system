"use client";

import React from "react";

// Mock utility for preview environment
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

// Định nghĩa kiểu cho Mock Button để tránh lỗi no-explicit-any
interface MockButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

// Mock Button for preview environment
const Button: React.FC<MockButtonProps> = ({
  children,
  variant,
  onClick,
  className,
  ...props
}) => (
  <button
    onClick={onClick}
    className={cn(
      "px-4 py-2 rounded-md font-medium transition-colors",
      variant === "primary"
        ? "bg-primary text-white hover:bg-primary-dark"
        : "bg-white border border-primary-light/30",
      className
    )}
    {...props}
  >
    {children}
  </button>
);

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center",
        "py-12 px-4 text-center",
        className
      )}
    >
      {icon ? (
        <div className="mb-4 text-text-muted">{icon}</div>
      ) : (
        <div className="mb-4">
          <svg
            className="w-16 h-16 text-text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>
      )}

      <h3 className="text-lg font-semibold text-text-primary mb-1">{title}</h3>

      {description && (
        <p className="text-sm text-text-secondary mb-4 max-w-sm">
          {description}
        </p>
      )}

      {action && (
        <Button variant="primary" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
};

EmptyState.displayName = "EmptyState";

export { EmptyState };
