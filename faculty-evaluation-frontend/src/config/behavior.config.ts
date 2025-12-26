// src/config/behavior.config.ts

interface BehaviorEvaluationItem {
  id: string;
  text: string;
}

interface RatingScale {
  category: string;
  ratings: string[];
}

interface BehaviorConfig {
  title: string;
  items: BehaviorEvaluationItem[];
  ratingScales: RatingScale[];
  ratingLabels: string[];
}

export const BEHAVIOR_EVALUATION_CONFIG: BehaviorConfig = {
  title: "教育者行動評価シート",

  items: [
    {
      id: "1",
      text: "教育の工夫・改善（アクティブラーニング導入、教材開発・更新、特別講義の開講、学内・学外連携等）を行っている。",
    },
    {
      id: "2",
      text: "成績評価の工夫・改善（評価基準の明確化、多様な評価方法・機会の設定等）を行っている。",
    },
    {
      id: "3",
      text: "修学支援（オフィスアワー活用、チュートリアル実施、相談室との連携等）を行っている。",
    },
    {
      id: "4",
      text: "キャリア形成・資格取得（進路指導支援、インターンシップ支援等）を行っている。",
    },
    {
      id: "5",
      text: "学生生活支援（課配学生への対応、クラブ・同好会顧問等）を行っている。",
    },
    {
      id: "6",
      text: "FD活動（FD講演会への参加、授業方法研究会の実施、学外研修参加等）を行っている。",
    },
    {
      id: "7",
      text: "看護研究・論文執筆・演奏活動・作品制作を行っている。",
    },
    {
      id: "8",
      text: "科研費等外部資金獲得活動を行っている。",
    },
    {
      id: "9",
      text: "学会活動等を行っている。",
    },
    {
      id: "10",
      text: "センター委員・その他委員会の活動（領域・学科・コース内の管理・運営活動等）を行っている。",
    },
    {
      id: "11",
      text: "学生確保の活動、広報活動（オープンキャンパス、高校訪問、出張講義等）を行っている。",
    },
    {
      id: "12",
      text: "学外における学識経験者としての活動（学外の審議会、委員会、研究会等）を行っている。",
    },
    {
      id: "13",
      text: "社会貢献・地域貢献活動を行っている。",
    },
    {
      id: "14",
      text: "社会人としての教員運作（法律、条例、服務規定等）を尽く行動を行っている。",
    },
  ],

  ratingScales: [
    {
      category: "教育活動実績",
      ratings: [
        "ほとんど実績がない",
        "一定程度の実績",
        "十分な実績",
        "想定以上の実績",
      ],
    },
    {
      category: "授業運営・学生サポート",
      ratings: [
        "どちらかといえば\n行動していない",
        "どちらかといえば\n行動している",
        "良く行動している\nいつも行動している",
        "常識を上回ること\nを継続できるレベル",
      ],
    },
  ],

  ratingLabels: ["1", "2", "3", "4"],
};
