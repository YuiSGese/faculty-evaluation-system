// src/config/personal.config.ts

interface ScoreDefinition {
  score: number;
  definition: string;
  quantitative: string;
  qualitative: string;
}

interface PersonalConfig {
  title: string;
  scoreDefinitions: ScoreDefinition[];
  instructionSteps: string[];
}

export const PERSONAL_EVALUATION_CONFIG: PersonalConfig = {
  title: "個人業績評価シート",

  scoreDefinitions: [
    {
      score: 1,
      definition: "もう少し",
      quantitative: "80未満",
      qualitative: "全く不十分な活動・実績",
    },
    {
      score: 2,
      definition: "普通",
      quantitative: "80～105",
      qualitative: "一部課題が残る活動・実績",
    },
    {
      score: 3,
      definition: "良くできた",
      quantitative: "106～120",
      qualitative: "十分な活動・実績",
    },
    {
      score: 4,
      definition: "大変良くできた",
      quantitative: "121以上",
      qualitative: "想定を上回る活動・実績",
    },
  ],

  instructionSteps: [
    "「区分①」の中から３つ選ぶ（期首）。",
    "「選択」の中からそれぞれの区分に対応する内容を選ぶ（期首）。",
    "「上位方針」（所属学部の達成水準と重点活動項目）の中から、該当の内容を選び記入する（期首）。",
    "「個人目標値（達成基準）」は各目標について180文字以内で記入（期首）。",
    "「区分②」は「チャレンジ／通常／継続」等から選択（期首）。",
    "期中：「個人目標進捗度（期中）」に進捗状況を180文字以内で記入。",
    "期末：「個人目標進捗度（期末）」に最終実績・達成度・理由を180文字以内で記入。",
    "期末：「評価対象者１年間の振り返りコメント」に年間総括（最大250文字）。",
  ],
};
