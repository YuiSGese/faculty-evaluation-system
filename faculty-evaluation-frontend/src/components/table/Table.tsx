"use client";

import React from "react";

// Mock utility for preview environment
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement> {
  containerClassName?: string;
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, containerClassName, children, ...props }, ref) => {
    return (
      <div className={cn("w-full overflow-x-auto", containerClassName)}>
        <table
          ref={ref}
          className={cn(
            "w-full text-sm",
            // Sửa: Thay border-collapse thành border-separate và border-spacing-0
            "border-separate border-spacing-0",
            className
          )}
          {...props}
        >
          {children}
        </table>
      </div>
    );
  }
);

Table.displayName = "Table";

export { Table };
