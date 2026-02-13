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
      category: "1.1 教育方法の実践例",
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
      category: "2.1 企業、官公庁等の研究者の場合",
      description:
        "・開発した新製品・製法。作物等の新品種等の概要・取得した特許等の概要\n・大学との共同研究による実績がある場合、その概要、成果、当該研究者の役割",
    },
    {
      category: "2.2その他企業・団体等関係者の場合",
      description:
        "・国際援助・開発、先端技術、国際金融等高度に専門的な実務に従事した実績",
    },
    {
      category: "2.3 情報技術関係者の場合",
      description:
        "・コンピュータに係る職務歴（職務上のコンピュータ活用方法、ソフト・システム開発歴）",
    },
    {
      category: "2.4マスコミ関係者の場合",
      description: "・執筆した記事の概要\n・製作した番組の内容",
    },
    {
      category: "2.5 法曹関係者の場合",
      description: "・関係した訴訟等での活動や判決の概要",
    },
    {
      category: "2.6 医師や看護師等医療技術者の場合",
      description: "・症例研究会での発表等の活動",
    },
    {
      category: "2.7 福祉士の社会福祉関連技術者の場合",
      description:
        "・参加した活動や団体の名称、活動内容・期間、本人の当該活動における地位",
    },
    {
      category: "2.8 音楽の実務分野の場合",
      description:
        "・リサイタル、個人の作品発表会、指揮者としての出演、リサイタルの伴奏、全国的なコンクール入選、所属グループの発表・演奏会\n・その他、上記に準ずるもの",
    },
    {
      category: "2.9 美術、デザイン等の芸術分野の場合",
      description: "・個展発表、公募展発表、その他上記に準ずるもの",
    },
    {
      category: "その他、全般を通して",
      description:
        "・各種の資格取得、受賞等の経歴\n・大学から受け入れた実習生に対する指導歴（看護・福祉実習、企業実習等）\n・企業内教育、大学公開講座、社会教育講座の講師としての講義等概要\n等",
    },
  ],
};
