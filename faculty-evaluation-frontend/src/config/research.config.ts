// src/config/research.config.ts

export interface EducationAbilityItem {
  category: string; // Category name
  placeholder: string; // Placeholder for input
}

export interface JobPerformanceItem {
  category: string; // Category name
  description: string; // Description text
}

export interface ResearchConfig {
  title: string;
  educationItems: EducationAbilityItem[];
  jobItems: JobPerformanceItem[];
}

export const RESEARCH_RECORD_CONFIG: ResearchConfig = {
  title: "教育研究業績書",

  // Section 1: 教育上の能力に関する事項 (4 categories)
  educationItems: [
    {
      category: "1 教育方法の実践例",
      placeholder: "教育方法の実践例を入力",
    },
    {
      category: "2 作成した教科書・教材",
      placeholder: "作成した教科書・教材を入力",
    },
    {
      category: "3 当該教員の教育上の能力に関する大学の評価",
      placeholder: "大学の評価を入力",
    },
    {
      category: "4 その他",
      placeholder: "その他の事項を入力",
    },
  ],

  // Section 2: 職務上の実績に関する事項 (10 categories)
  jobItems: [
    {
      category: "企業、官公庁等の研究者の場合",
      description:
        "・開発した製品と・製法、作物の品種改良の概要・研究し開発の概要\n・大学が研究に対する支援活動した記事の概要、その他に関する教育評価",
    },
    {
      category: "その他企業・団体等関係者の場合",
      description:
        "・研究機会・開発、実務経験、国際金融等業績に対実際に運営に運営した実績",
    },
    {
      category: "情報技術関係者の場合",
      description:
        "・コンピュータに係る顕彰課（施設上のコンピュータ活用方法、ソフト・システム開発等）",
    },
    {
      category: "マスコミ関係者の場合",
      description: "・執筆した記事の概要\n・制作した番組の概要",
    },
    {
      category: "法曹関係者の場合",
      description: "・関与した訴訟事務の法廷弁護又は概要",
    },
    {
      category: "医師や看護師等医療技術者の場合",
      description: "・医療研究での実績者の法理",
    },
    {
      category: "福祉士の社会福祉関連技術者の場合",
      description:
        "・参加した患者や関係の支援、活動対策・施設、支人の法律活動上において計画地域",
    },
    {
      category: "音楽の実務分野の場合",
      description:
        "・リサイタル、個人の作品発表、指揮者としての出演、リサイタルの作曲、全国コンクール入賞、の受賞グループの受賞や、演奏など、主に記載するもの",
    },
    {
      category: "美術、デザイン等の芸術分野の場合",
      description: "・個展会費、公募展実績、その他に記載に加えるもの",
    },
    {
      category: "その他、全般を通して",
      description:
        "・各種の資格取得、委託研修の超過\n・大学が受任又は支援主客に対する指導案（音楽・芸術実習、委嘱実習等）\n・委嘱実績賞、大学の教育研究、社会貢献等の提唱がして教育等研究助成",
    },
  ],
};
