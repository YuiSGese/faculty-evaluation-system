import type {
  CategoryConfig,
  ScoreItem,
  TableData,
  CategoryData,
} from "@/types";
import { createEmptyScoreItem } from "@/types";

// --- CONSTANTS & TYPE GUARDS ---

// Định nghĩa các trường số cần tính toán
export const NUMERIC_FIELDS = [
  "selfScore",
  "score",
  "aiScore",
  "aiEvaluation",
] as const;
export type NumericScoreField = (typeof NUMERIC_FIELDS)[number];

// Hàm kiểm tra xem field có phải là số không (để tránh lỗi 'never' trong TS)
export function isNumericField(
  field: keyof ScoreItem
): field is NumericScoreField {
  return (NUMERIC_FIELDS as readonly string[]).includes(field);
}

// --- EXISTING FUNCTIONS (Giữ nguyên code cũ của bạn) ---

export function sumValues(values: number[]): number {
  return values.reduce((sum, val) => sum + (val || 0), 0);
}

export function calculateCategoryTotal(
  items: Record<string, ScoreItem>,
  field: keyof ScoreItem = "score"
): number {
  return Object.values(items).reduce((sum, item) => {
    const value = item[field];
    return sum + (typeof value === "number" ? value : 0);
  }, 0);
}

export function calculateGrandTotal(
  categories: Record<string, { total: ScoreItem }>,
  field: keyof ScoreItem = "score"
): number {
  return Object.values(categories).reduce((sum, category) => {
    const value = category.total[field];
    return sum + (typeof value === "number" ? value : 0);
  }, 0);
}

export function calculatePercentage(value: number, maxValue: number): number {
  if (maxValue === 0) return 0;
  return Math.min((value / maxValue) * 100, 100);
}

export function calculateRadarPoint(
  centerX: number,
  centerY: number,
  radius: number,
  angleIndex: number,
  totalAxes: number
): { x: number; y: number } {
  const angleStep = (2 * Math.PI) / totalAxes;
  const angle = angleIndex * angleStep - Math.PI / 2;
  return {
    x: centerX + radius * Math.cos(angle),
    y: centerY + radius * Math.sin(angle),
  };
}

export function generateRadarPolygonPoints(
  values: number[],
  maxValues: number[],
  centerX: number,
  centerY: number,
  maxRadius: number
): string {
  const totalAxes = values.length;
  const points = values.map((value, index) => {
    const percentage = calculatePercentage(value, maxValues[index]);
    const radius = (percentage / 100) * maxRadius;
    const point = calculateRadarPoint(
      centerX,
      centerY,
      radius,
      index,
      totalAxes
    );
    return `${point.x},${point.y}`;
  });
  return points.join(" ");
}

// --- NEW FUNCTION: RECALCULATE WHOLE TABLE ---
// Đây là hàm "trái tim" mới, xử lý việc tính toán lại toàn bộ dữ liệu
export function recalculateTable(
  data: TableData<ScoreItem>
): TableData<ScoreItem> {
  // Clone object để đảm bảo tính immutability (bất biến)
  const newCategories = { ...data.categories };

  // 1. Tính lại tất cả Category Totals
  Object.keys(newCategories).forEach((categoryId) => {
    const category = newCategories[categoryId];
    const newTotal = { ...category.total };

    // Chỉ tính toán lại các trường số
    NUMERIC_FIELDS.forEach((field) => {
      newTotal[field] = calculateCategoryTotal(category.items, field);
    });

    newCategories[categoryId] = {
      ...category,
      total: newTotal,
    };
  });

  // 2. Tính lại Grand Total dựa trên Category Totals mới
  const newGrandTotal = { ...(data.grandTotal || createEmptyScoreItem()) };

  NUMERIC_FIELDS.forEach((field) => {
    newGrandTotal[field] = calculateGrandTotal(newCategories, field);
  });

  return {
    categories: newCategories,
    grandTotal: newGrandTotal,
  };
}
