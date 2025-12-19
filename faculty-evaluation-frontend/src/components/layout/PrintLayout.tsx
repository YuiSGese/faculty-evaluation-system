"use client";

import React from "react";

// Mock utility for preview environment
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export interface PrintLayoutProps {
  children: React.ReactNode;
  title?: string;
  showPrintButton?: boolean;
  onPrint?: () => void;
  className?: string;
}

const PrintLayout: React.FC<PrintLayoutProps> = ({
  children,
  title,
  showPrintButton = true,
  onPrint,
  className,
}) => {
  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  return (
    <div className={cn("relative", className)}>
      {/* Print button - hidden when printing */}
      {showPrintButton && (
        <div className="print:hidden fixed top-4 right-4 z-50">
          <button
            onClick={handlePrint}
            className={cn(
              "flex items-center gap-2 px-4 py-2",
              "bg-primary hover:bg-primary-dark text-white",
              "rounded-lg shadow-lg",
              "transition-colors duration-200"
            )}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            印刷
          </button>
        </div>
      )}

      {/* Print content */}
      <div
        className={cn(
          // Screen styles
          "bg-white",
          // Print styles
          "print:p-0 print:m-0 print:shadow-none",
          "print:bg-white print:text-black"
        )}
      >
        {title && (
          <div className="hidden print:block text-center mb-4">
            <h1 className="text-xl font-bold">{title}</h1>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

PrintLayout.displayName = "PrintLayout";

export { PrintLayout };
