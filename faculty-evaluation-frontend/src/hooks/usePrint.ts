"use client";

import { useCallback, useRef } from "react";

export interface UsePrintOptions {
  title?: string;
  beforePrint?: () => void;
  afterPrint?: () => void;
}

export interface UsePrintReturn {
  printRef: React.RefObject<HTMLDivElement | null>;
  handlePrint: () => void;
  isPrintMode: boolean;
}

export function usePrint(options: UsePrintOptions = {}): UsePrintReturn {
  const { title, beforePrint, afterPrint } = options;
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useCallback(() => {
    // Call beforePrint callback
    beforePrint?.();

    // Set document title for print
    const originalTitle = document.title;
    if (title) {
      document.title = title;
    }

    // Trigger print
    window.print();

    // Restore original title
    document.title = originalTitle;

    // Call afterPrint callback
    afterPrint?.();
  }, [title, beforePrint, afterPrint]);

  // Check if in print mode (for conditional rendering)
  const isPrintMode =
    typeof window !== "undefined" && window.matchMedia("print").matches;

  return {
    printRef,
    handlePrint,
    isPrintMode,
  };
}

// Print-specific CSS classes helper
export const printClasses = {
  hideOnPrint: "print:hidden",
  showOnlyOnPrint: "hidden print:block",
  pageBreakBefore: "print:break-before-page",
  pageBreakAfter: "print:break-after-page",
  avoidBreak: "print:break-inside-avoid",
  fullWidth: "print:w-full",
  noPadding: "print:p-0",
  noMargin: "print:m-0",
  noShadow: "print:shadow-none",
  noBorder: "print:border-0",
  blackText: "print:text-black",
  whiteBg: "print:bg-white",
};
