"use client";

import React, { useId } from "react";
import { cn } from "@/utils/cn";

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
  hint?: string;
  variant?: "default" | "compact" | "table";
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className,
      error,
      label,
      hint,
      id,
      variant = "default",
      rows = 3,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const textareaId = id || generatedId;

    const variants = {
      default: "px-3 py-2 rounded-lg border-primary-light/30",
      compact: "px-2 py-1 rounded border-primary-light/30",
      table:
        "px-2 py-1 border border-primary-light/30 bg-white resize-none w-full min-h-[60px] rounded shadow-sm focus:border-primary focus:ring-1 focus:ring-primary-light/20",
    };

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-text-primary mb-1"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          className={cn(
            "text-sm",
            "transition-all duration-200",
            "focus:outline-none",
            variant !== "table" && "border focus:ring-2 focus:ring-offset-0",
            variant !== "table" &&
              (error
                ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                : "focus:border-primary focus:ring-primary-light/20"),
            variant === "table" &&
              "focus:bg-white focus:ring-1 focus:ring-primary-light/20",
            "placeholder:text-text-muted",
            "disabled:bg-background-subtle disabled:text-text-muted disabled:cursor-not-allowed",
            variants[variant],
            className
          )}
          {...props}
        />
        {hint && !error && (
          <p className="mt-1 text-xs text-text-muted">{hint}</p>
        )}
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export { TextArea };
