/**
 * Types for Table Configuration
 * Data-driven table rendering
 */

// Column types
export type ColumnType = "text" | "number" | "textarea" | "readonly" | "label";

// Column configuration
export interface ColumnConfig {
  id: string;
  name: string;
  width?: string;
  minWidth?: string;
  type: ColumnType;
  align?: "left" | "center" | "right";

  isAI?: boolean;
  isEvaluation?: boolean;
  isOverview?: boolean;
  isTotal?: boolean;

  step?: number;
  min?: number;
  max?: number;
  placeholder?: string;
  readonly?: boolean;
}

// Item configuration
export interface ItemConfig {
  id: string;
  name: string;
  hasAI?: boolean;
  isSubcategory?: boolean;
}

// Category configuration
export interface CategoryConfig {
  id: string;
  name: string;
  items: ItemConfig[];
  hasTotal: boolean;
  totalLabel?: string;
}

// Full table configuration
export interface TableConfig {
  id: string;
  title: string;
  categories: CategoryConfig[];
  columns: ColumnConfig[];
  hasGrandTotal: boolean;
  grandTotalLabel?: string;
}

// Row variant
export type RowVariant =
  | "default"
  | "category-header"
  | "subcategory"
  | "item"
  | "total"
  | "grand-total";

// Cell variant
export type CellVariant =
  | "default"
  | "ai-score"
  | "evaluation"
  | "overview"
  | "total"
  | "grand-total"
  | "header"
  | "label";

// Table data structure (generic)
export interface TableData<T = unknown> {
  categories: Record<string, CategoryData<T>>;
  grandTotal?: T;
}

export interface CategoryData<T = unknown> {
  items: Record<string, T>;
  total: T;
}

// Score detail table
export interface ScoreDetailRow {
  employeeNumber: string;
  name: string;
  department: string;
  position1: string;
  position2?: string;
  resume?: number;
  achievements?: number;
  scores: Record<string, number>;
  categoryTotals: Record<string, number>;
  grandTotal: number;
}

// Summary table
export interface SummaryRow {
  employeeNumber: string;
  name: string;
  department: string;
  position1: string;
  position2?: string;
  categoryTotals: Record<string, number>;
  grandTotal: number;
}
