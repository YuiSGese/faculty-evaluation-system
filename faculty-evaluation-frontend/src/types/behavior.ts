// src/types/behavior.ts

// Faculty Info (simple version for Behavior page)
export interface BehaviorFacultyInfo {
  name: string;
  department: string;
  employeeNumber: string;
  position: string;
}

// Behavior Evaluation Item
export interface BehaviorEvaluationItem {
  id: string;
  text: string; // 評価項目テキスト
  selfScore: number; // 自己評価 (1-4)
  aiScore: number; // AIスコア
  aiEvaluation: number; // AI評価
  evaluation: number; // 最終評価
  aiSummary: string; // AI評価概要
}

// Behavior Evaluation Data
export interface BehaviorEvaluationData {
  facultyInfo: BehaviorFacultyInfo;
  year: number;
  items: BehaviorEvaluationItem[]; // ← THÊM FIELD NÀY

  // Signature fields (optional)
  evaluatorPosition?: string;
  evaluatorName?: string;
  signatureDate?: {
    year: string;
    month: string;
    day: string;
  };
}
