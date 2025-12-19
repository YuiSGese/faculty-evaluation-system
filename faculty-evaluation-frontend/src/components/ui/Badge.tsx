"use client";

import React from "react";

// Mock utility for preview environment
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "primary"
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "S"
    | "A"
    | "B"
    | "C"
    | "completed";
  size?: "sm" | "md" | "lg";
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { className, variant = "default", size = "md", children, ...props },
    ref
  ) => {
    const variants = {
      // Sửa: bg-slate-100 -> bg-background-subtle, text-slate-700 -> text-text-primary
      default:
        "bg-background-subtle text-text-primary border border-primary-light/20",

      primary:
        "bg-primary-lightest text-primary border border-primary-light/50",
      success: "bg-emerald-100 text-success-dark border border-success-light",
      warning: "bg-amber-100 text-warning-dark border border-warning-light",
      danger: "bg-red-100 text-error-dark border border-error-light",
      info: "bg-blue-100 text-info-dark border border-info-light",

      // Evaluation grade badges
      S: "bg-amber-100 text-grade-s border border-warning-light font-bold",
      A: "bg-emerald-100 text-grade-a border border-success-light font-bold",
      B: "bg-blue-100 text-grade-b border border-info-light font-semibold",

      // Sửa: bg-slate-100 -> bg-background-subtle, border-slate-200 -> border-primary-light/20
      C: "bg-background-subtle text-grade-c border border-primary-light/20",

      completed:
        "bg-green-100 text-grade-completed border border-success-light font-semibold",
    };

    const sizes = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-3 py-1 text-sm",
      lg: "px-4 py-1.5 text-base",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md border", // Thêm border base
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
