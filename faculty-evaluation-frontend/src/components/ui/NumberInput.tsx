"use client";

import React from "react";
import { cn } from "@/utils/cn";

export interface NumberInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "onChange"
  > {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  error?: string;
  variant?: "default" | "compact" | "table";
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      className,
      value,
      onChange,
      min = 0,
      max,
      step = 0.1,
      error,
      variant = "default",
      disabled,
      ...props
    },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(e.target.value);
      if (!isNaN(newValue)) {
        onChange?.(newValue);
      } else if (e.target.value === "") {
        onChange?.(0);
      }
    };

    const variants = {
      default: "px-3 py-2 rounded-lg border-slate-300",
      compact: "px-2 py-1 rounded border-slate-300",
      table:
        "px-2 py-1 border border-slate-300 bg-white text-center w-full rounded shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500",
    };

    return (
      <input
        type="number"
        ref={ref}
        value={value ?? ""}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={cn(
          "text-sm tabular-nums",
          "transition-all duration-200",
          "focus:outline-none",
          variant !== "table" && "border focus:ring-2 focus:ring-offset-0",
          variant !== "table" &&
            (error
              ? "border-red-300 focus:border-red-500 focus:ring-red-200"
              : "focus:border-indigo-500 focus:ring-indigo-200"),
          variant === "table" &&
            "focus:bg-white focus:ring-1 focus:ring-indigo-400",
          "disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed",
          "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

NumberInput.displayName = "NumberInput";

export { NumberInput };
