"use client";

import { createContext, useContext } from "react";
import type { ScoreItem } from "@/types";

interface TableContextType {
  readonly: boolean;
  onTableChange?: (
    categoryId: string,
    itemId: string | "total",
    field: keyof ScoreItem,
    value: ScoreItem[keyof ScoreItem]
  ) => void;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

export function useTableContext() {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTableContext must be used within a TableProvider");
  }
  return context;
}

export const TableProvider = TableContext.Provider;
