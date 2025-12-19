/**
 * Types for Evaluation Forms
 */

import type { ScoreItem } from './faculty';

// Score definition (評点 1-4)
export interface ScoreDefinition {
  score: number;
  label: string;
  quantitativeRange: string;  // 定量基準
  qualitativeDescription: string; // 定性基準
}

// Default score definitions
export const DEFAULT_SCORE_DEFINITIONS: ScoreDefinition[] = [
  {
    score: 1,
    label: 'もう少し',
    quantitativeRange: '80未満',
    qualitativeDescription: '全く不十分な活動・実績',
  },
  {
    score: 2,
    label: '普通',
    quantitativeRange: '80～105',
    qualitativeDescription: '一部課題が残る活動・実績',
  },
  {
    score: 3,
    label: '良くできた',
    quantitativeRange: '106～120',
    qualitativeDescription: '十分な活動・実績',
  },
  {
    score: 4,
    label: '大変良くできた',
    quantitativeRange: '121以上',
    qualitativeDescription: '想定を上回る活動・実績',
  },
];

// Personal evaluation sheet (個人業績評価シート)
export interface PersonalEvaluationSheet {
  id: string;
  facultyId: string;
  year: number;
  
  // 評価対象者情報
  evalueeInfo: {
    name: string;
    department: string;
    employeeNumber: string;
    position: string;
  };
  
  // メイン評価表
  evaluationItems: PersonalEvaluationItem[];
  
  // AI評価
  aiEvaluation: {
    individualScore: number;
    aiScore: number;
    aiEvaluation: number;
    evaluation: string;
    aiOverview: string;
  }[];
  
  // 振り返りコメント
  reflectionComment: string;
  
  // 評価者情報
  evaluatorInfo: {
    position: string;
    name: string;
    date?: Date;
  }[];
}

// Personal evaluation item
export interface PersonalEvaluationItem {
  category: string;      // 区分①
  selection: string;     // 選択
  upperPolicy: string;   // 上位方針
  personalGoal: string;  // 個人目標値
  midTermProgress: string; // 個人目標進捗度（期中）
  finalProgress: string;   // 個人目標進捗度（期末）
  classification: string;  // 区分②
}

// Educator behavior evaluation (教育者行動評価シート)
export interface EducatorBehaviorEvaluation {
  id: string;
  facultyId: string;
  year: number;
  
  evalueeInfo: {
    name: string;
    department: string;
    employeeNumber: string;
    position: string;
  };
  
  items: EducatorBehaviorItem[];
  
  total: number;
  aiScore?: number;
  aiEvaluation?: number;
  evaluation?: string;
  evaluationTotal?: number;
  aiOverview?: string;
}

// Educator behavior evaluation item
export interface EducatorBehaviorItem {
  id: string;
  description: string;
  selfScore: number;  // 4点満点
  aiScore?: number;
  aiEvaluation?: number;
  evaluation?: string;
  aiOverview?: string;
}

// Default educator behavior items
export const DEFAULT_EDUCATOR_BEHAVIOR_ITEMS: Omit<EducatorBehaviorItem, 'selfScore' | 'aiScore' | 'aiEvaluation' | 'evaluation' | 'aiOverview'>[] = [
  { id: '1', description: '①教育の工夫・改善（アクティブラーニング導入、教材開発・更新、特別講義の開講、学内・学外連携等）を行っている。' },
  { id: '2', description: '②成績評価の工夫・改善（評価基準の明確化、多様な評価方法・機会の設定等）を行っている。' },
  { id: '3', description: '③修学支援（オフィスアワー活用、チュートリアル実施、相談室との連携等）を行っている。' },
  { id: '4', description: '④キャリア形成・資格取得（進路指導支援、インターンシップ支援等）を行っている。' },
  { id: '5', description: '⑤学生生活支援（課外学生への対応、クラブ・同好会顧問等）を行っている。' },
  { id: '6', description: '⑥FD活動（FD講演会への参加、授業方法研究会の実施、学外研修参加等）を行っている。' },
  { id: '7', description: '⑦看護研究・論文執筆・演奏活動・作品制作を行っている。' },
  { id: '8', description: '⑧科研費等外部資金獲得活動を行っている。' },
  { id: '9', description: '⑨学会活動等を行っている。' },
  { id: '10', description: '⑩センター委員・その他委員会の活動（領域・学科・コース内の管理・運営活動等）を行っている。' },
  { id: '11', description: '⑪学生確保の活動、広報活動（オープンキャンパス、高校訪問、出張講義等）を行っている。' },
  { id: '12', description: '⑫学外における学識経験者としての活動（学外の審議会、委員会、研究会等）を行っている。' },
  { id: '13', description: '⑬社会貢献・地域貢献活動を行っている。' },
  { id: '14', description: '⑭社会人としての教員運作（法律、条例、服務規定等）を尽く行動を行っている。' },
];

// Education research record (教育研究業績書)
export interface EducationResearchRecord {
  id: string;
  facultyId: string;
  
  // 教育上の能力に関する事項
  educationAbility: EducationAbilitySection;
  
  // 職務上の実績に関する事項
  jobPerformance: JobPerformanceSection;
  
  // 著書，学術論文等
  publications: PublicationItem[];
}

export interface EducationAbilitySection {
  teachingMethods: RecordItem[];      // 教育方法の実践例
  textbooks: RecordItem[];            // 作成した教科書・教材
  universityEvaluation: RecordItem[]; // 大学の評価
  others: RecordItem[];               // その他
}

export interface JobPerformanceSection {
  researcherActivities: RecordItem[];   // 企業、官公庁等の研究者
  otherActivities: RecordItem[];        // その他企業・団体等
  itActivities: RecordItem[];           // 情報技術関係者
  mediaActivities: RecordItem[];        // マスコミ関係者
  legalActivities: RecordItem[];        // 法曹関係者
  medicalActivities: RecordItem[];      // 医師や看護師等
  welfareActivities: RecordItem[];      // 福祉その他社会的活動
  musicActivities: RecordItem[];        // 音楽等の芸術分野
  artActivities: RecordItem[];          // 美術、デザイン等
  generalActivities: RecordItem[];      // その他、全般
}

export interface RecordItem {
  date?: Date;
  summary: string;
}

export interface PublicationItem {
  title: string;
  authorType: 'single' | 'co-author';  // 単著/共著
  publishDate?: Date;
  publisher: string;
  summary: string;
}
