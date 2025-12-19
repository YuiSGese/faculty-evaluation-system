"use client";

import React from "react";

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export interface FormSectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  variant?: "default" | "bordered" | "highlighted";
  className?: string;
}

const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  children,
  variant = "default",
  className,
}) => {
  const variants = {
    default: "",
    bordered: "border border-primary-light/20 rounded-lg p-4",
    highlighted:
      "bg-primary-lightest/50 border-l-4 border-primary rounded-r-lg p-4",
  };

  return (
    <section className={cn("mb-6", variants[variant], className)}>
      {(title || description) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
          )}
          {description && (
            <p className="text-sm text-text-secondary mt-1">{description}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
};

FormSection.displayName = "FormSection";

export { FormSection };
