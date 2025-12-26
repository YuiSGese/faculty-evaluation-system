// src/types/personal.ts

// Faculty Info (simple version for Personal page)
export interface PersonalFacultyInfo {
  name: string;
  department: string;
  employeeNumber: string;
  position: string;
}

// Personal Goal Item
export interface PersonalGoalItem {
  id: string;
  category1: string; // 区分① (教育, 研究, 社会貢献)
  selection: string; // 選択
  upperPolicy: string; // 上位方針
  personalGoal: string; // 個人目標値
  progressMid: string; // 個人目標進捗度（期中）
  progressEnd: string; // 個人目標進捗度（期末）
  category2: string; // 区分② (チャレンジ/通常/継続)
  individualScore?: number; // 個別評点
  aiScore: number; // AIスコア
  aiEvaluation: number; // AI評価
  evaluation?: number; // 評価
  aiSummary: string; // AI評価概要
}

// Signature Date
export interface SignatureDate {
  year: string;
  month: string;
  day: string;
}

// Personal Evaluation Data
export interface PersonalEvaluationData {
  facultyInfo: PersonalFacultyInfo;
  year: number;
  goals: PersonalGoalItem[];
  reflectionComment: string; // 評価対象者1年間の振り返りコメント
  evaluatorPosition: string; // 役職名
  evaluatorName: string; // 氏名
  signatureDate: SignatureDate; // 令和 年月日
}
