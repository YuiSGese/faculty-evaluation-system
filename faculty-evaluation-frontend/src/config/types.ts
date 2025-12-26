// src/config/types.ts
// Định nghĩa types cho Faculty Config

export type RoleType = "fulltime" | "parttime";

export interface CategoryItem {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  items: CategoryItem[];
  hasTotal: boolean;
  totalLabel?: string;
  isHiddenInTable?: boolean;
}

export interface RadarConfig {
  axes: number;
  categories: {
    id: string;
    name: string;
    maxValue: number;
  }[];
}

export interface FacultyConfig {
  role: RoleType;
  titlePerformance: string;
  titleScore: string;
  titleSummary: string;
  titleRadar: string;
  categories: Category[];
  radar: RadarConfig;
}
