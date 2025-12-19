"use client";

import React from "react";

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

const Label = ({
  className,
  children,
  required,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean }) => (
  <label
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-text-primary",
      className
    )}
    {...props}
  >
    {children}
    {required && <span className="text-error-dark ml-1">*</span>}
  </label>
);

export interface FormFieldProps {
  label: string;
  htmlFor?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
  horizontal?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  htmlFor,
  required,
  error,
  hint,
  children,
  className,
  horizontal = false,
}) => {
  return (
    <div
      className={cn(
        horizontal ? "flex items-center gap-4" : "flex flex-col gap-1.5",
        className
      )}
    >
      <Label
        htmlFor={htmlFor}
        required={required}
        className={cn(horizontal && "min-w-fit")}
      >
        {label}
      </Label>
      <div className={cn("flex-1", horizontal && "max-w-md")}>
        {children}
        {hint && !error && (
          <p className="mt-1 text-xs text-text-muted">{hint}</p>
        )}
        {error && <p className="mt-1 text-xs text-error-dark">{error}</p>}
      </div>
    </div>
  );
};

FormField.displayName = "FormField";

export { FormField };
