/**
 * Types for Faculty (専任教員) and Part-time (非常勤教職員) staff
 */

// Faculty type enum
export type FacultyType = "fulltime" | "parttime";

// Basic faculty information
export interface FacultyInfo {
  id: string;
  employeeNumber: string;
  name: string;
  department: string;
  position1: string;
  position2?: string;
  facultyType: FacultyType;
}

// Score item for each evaluation category
export interface ScoreItem {
  selfScore: number | null;
  score: number | null;
  aiScore: number | null;
  aiEvaluation: number | null;
  evaluation: string | null;
  aiOverview: string | null;
}

export function createEmptyScoreItem(): ScoreItem {
  return {
    selfScore: null,
    score: null,
    aiScore: null,
    aiEvaluation: null,
    evaluation: null,
    aiOverview: null,
  };
}

// Evaluation category with items and total
export interface EvaluationCategory {
  id: string;
  name: string;
  items: Record<string, ScoreItem>;
  total: ScoreItem;
}

// Full-time faculty categories (8 categories)
export interface FulltimeFacultyCategories {
  booksPapers: EvaluationCategory; // 著書・論文
  education: EvaluationCategory; // 教育関連
  conference: EvaluationCategory; // 学会発表
  music: EvaluationCategory; // 音楽関連
  art: EvaluationCategory; // 芸術関連
  socialContribution: EvaluationCategory; // 社会貢献
  universityManagement: EvaluationCategory; // 大学運営
  externalFunding: EvaluationCategory; // 外部資金
}

// Part-time faculty categories (6 categories)
export interface ParttimeFacultyCategories {
  booksPapers: EvaluationCategory; // 著書・論文
  education: EvaluationCategory; // 教育関連
  conference: EvaluationCategory; // 学会発表
  music: EvaluationCategory; // 音楽関連
  art: EvaluationCategory; // 芸術関連
  socialContribution: EvaluationCategory; // 社会貢献
}

// Full performance data for full-time faculty
export interface FulltimeFacultyPerformance {
  faculty: FacultyInfo;
  year: number;
  categories: FulltimeFacultyCategories;
  grandTotal: ScoreItem;
  createdAt?: Date;
  updatedAt?: Date;
}

// Full performance data for part-time faculty
export interface ParttimeFacultyPerformance {
  faculty: FacultyInfo;
  year: number;
  categories: ParttimeFacultyCategories;
  grandTotal: ScoreItem;
  createdAt?: Date;
  updatedAt?: Date;
}

// Union type for any faculty performance
export type FacultyPerformance =
  | FulltimeFacultyPerformance
  | ParttimeFacultyPerformance;

// Summary row for list views
export interface FacultySummary {
  id: string;
  employeeNumber: string;
  name: string;
  department: string;
  position1: string;
  position2?: string;
  categoryTotals: Record<string, number>;
  grandTotal: number;
}

// Radar chart data point
export interface RadarDataPoint {
  category: string;
  value: number;
  maxValue: number;
}

// Radar chart data for a faculty member
export interface FacultyRadarData {
  facultyId: string;
  facultyName: string;
  year: number;
  dataPoints: RadarDataPoint[];
}
