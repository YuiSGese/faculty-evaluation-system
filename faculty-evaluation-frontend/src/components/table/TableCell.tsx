"use client";

import React from "react";

// Mock utility for preview environment
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

type CellVariant =
  | "default"
  | "ai-score"
  | "evaluation"
  | "overview"
  | "total"
  | "grand-total"
  | "header"
  | "label";

export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {
  variant?: CellVariant;
  as?: "td" | "th";
}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  (
    {
      className,
      variant = "default",
      as: Component = "td",
      children,
      ...props
    },
    ref
  ) => {
    const variants: Record<CellVariant, string> = {
      // Sửa: border-slate-200 -> border-primary-light/20
      default: "border-primary-light/20",
      // Sửa: border-slate-300 -> border-primary-light/30
      "ai-score": "bg-emerald-100/70 border-primary-light/30",
      evaluation: "bg-amber-100/70 border-primary-light/30",
      // Sửa: bg-sky-50 -> bg-blue-100/50
      overview: "bg-blue-100/50 border-primary-light/30",
      // Sửa: bg-orange-50 -> bg-amber-100
      total: "bg-amber-100 border-primary-light/20 font-semibold",
      "grand-total": "font-bold",
      // Sửa: indigo/purple -> primary/primary-dark
      header: `
        bg-gradient-to-r from-primary to-primary-dark
        text-white font-semibold
        border-primary
      `,
      // Sửa: text-slate-700 -> text-text-primary, border-slate-200 -> border-primary-light/20
      label:
        "text-left pl-4 font-medium text-text-primary border-primary-light/20",
    };

    return (
      <Component
        ref={ref}
        className={cn(
          "px-3 py-2.5",
          "border",
          "text-center align-middle",
          "transition-colors duration-150",
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

TableCell.displayName = "TableCell";

// Header cell variant
export type TableHeadCellProps = React.ThHTMLAttributes<HTMLTableCellElement>;

const TableHeadCell = React.forwardRef<
  HTMLTableCellElement,
  TableHeadCellProps
>(({ className, children, ...props }, ref) => {
  return (
    <th
      ref={ref}
      className={cn(
        "px-3 py-3",
        // Sửa: border-indigo-500 -> border-primary
        "border border-primary",
        "text-center align-middle",
        // Sửa: indigo/purple -> primary/primary-dark
        "bg-gradient-to-r from-primary to-primary-dark",
        "text-white font-semibold text-sm",
        className
      )}
      {...props}
    >
      {children}
    </th>
  );
});

TableHeadCell.displayName = "TableHeadCell";

export { TableCell, TableHeadCell };
