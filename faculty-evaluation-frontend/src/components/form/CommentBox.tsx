"use client";

import React from "react";

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export interface CommentBoxProps {
  title: string;
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
  maxLength?: number;
  readonly?: boolean;
  variant?: "default" | "highlighted";
  className?: string;
}

const CommentBox: React.FC<CommentBoxProps> = ({
  title,
  value,
  onChange,
  placeholder = "",
  minHeight = "120px",
  maxLength,
  readonly = false,
  variant = "default",
  className,
}) => {
  const variants = {
    default: "bg-white",
    highlighted: "bg-amber-100",
  };

  const headerVariants = {
    default: "bg-background-subtle",
    highlighted: "bg-primary-lightest/50",
  };

  return (
    <div
      className={cn(
        "border border-primary-light/30 rounded-lg overflow-hidden",
        className
      )}
    >
      <div
        className={cn(
          "px-4 py-2 font-semibold text-sm text-text-primary",
          headerVariants[variant]
        )}
      >
        {title}
      </div>

      <div className={cn("p-4", variants[variant])}>
        {readonly ? (
          <div
            className="text-sm whitespace-pre-wrap text-text-primary"
            style={{ minHeight }}
          >
            {value || <span className="text-text-muted">{placeholder}</span>}
          </div>
        ) : (
          <div className="relative">
            <textarea
              value={value}
              onChange={(e) => onChange?.(e.target.value)}
              placeholder={placeholder}
              maxLength={maxLength}
              className={cn(
                "w-full text-sm resize-none text-text-primary",
                "bg-transparent border-0",
                "focus:outline-none focus:ring-0",
                "placeholder:text-text-muted"
              )}
              style={{ minHeight }}
            />
            {maxLength && (
              <div className="absolute bottom-0 right-0 text-xs text-text-muted">
                {value.length} / {maxLength}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

CommentBox.displayName = "CommentBox";

export { CommentBox };
