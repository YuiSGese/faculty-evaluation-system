"use client";

import React from "react";

// Mock utility for preview environment
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

type RowVariant =
  | "default"
  | "category-header"
  | "subcategory"
  | "item"
  | "total"
  | "grand-total";

export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  variant?: RowVariant;
  hoverable?: boolean;
}

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  (
    { className, variant = "default", hoverable = true, children, ...props },
    ref
  ) => {
    const variants: Record<RowVariant, string> = {
      default: "",
      // Sửa: slate-700/800 -> text-primary/primary-dark
      "category-header": `
        bg-gradient-to-r from-text-primary to-primary-dark
        text-white font-semibold
      `,
      // Sửa: bg-slate-100 -> bg-background-subtle, text-slate-700 -> text-text-primary
      subcategory: `
        bg-background-subtle
        font-medium text-text-primary
      `,
      item: "",
      // Giữ nguyên highlights màu cam/đỏ cho Total/Grand Total nhưng cập nhật text nếu cần
      total: `
        bg-gradient-to-r from-orange-500 to-orange-600
        text-white font-semibold
      `,
      "grand-total": `
        bg-gradient-to-r from-red-500 to-red-600
        text-white font-bold text-base
      `,
    };

    return (
      <tr
        ref={ref}
        className={cn(
          "transition-colors duration-150",
          // Sửa: hover:bg-indigo-50/50 -> hover:bg-primary-lightest/50
          hoverable && variant === "default" && "hover:bg-primary-lightest/50",
          hoverable && variant === "item" && "hover:bg-primary-lightest/50",
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </tr>
    );
  }
);

TableRow.displayName = "TableRow";

export { TableRow };
