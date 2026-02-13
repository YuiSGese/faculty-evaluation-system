import type { ResearchRecordData } from "@/types/research";

export const MOCK_RESEARCH_RECORD: ResearchRecordData = {
  facultyInfo: {
    name: "山田 太郎",
    department: "音楽学部・音楽学科",
    employeeNumber: "T001",
    position: "教授",
  },
  year: 2025,

  // Section 1: 教育上の能力 (4 categories × 2 rows each - ALL EMPTY)
  educationRecords: [
    {
      category: "1.1教育方法の実践例",
      items: [
        { title: "", date: "", summary: "" },
        { title: "", date: "", summary: "" },
      ],
    },
    {
      category: "1.2 作成した教科書・教材",
      items: [
        { title: "", date: "", summary: "" },
        { title: "", date: "", summary: "" },
      ],
    },
    {
      category: "1.3 当該教員の教育上の能力に関する大学の評価",
      items: [
        { title: "", date: "", summary: "" },
        { title: "", date: "", summary: "" },
      ],
    },
    {
      category: "1.4 その他",
      items: [
        { title: "", date: "", summary: "" },
        { title: "", date: "", summary: "" },
      ],
    },
  ],

  // Section 2: 職務上の実績 (10 categories - ALL EMPTY)
  jobRecords: [
    { category: "企業、官公庁等の研究者の場合", summary: "" },
    { category: "その他企業・団体等関係者の場合", summary: "" },
    { category: "情報技術関係者の場合", summary: "" },
    { category: "マスコミ関係者の場合", summary: "" },
    { category: "法曹関係者の場合", summary: "" },
    { category: "医師や看護師等医療技術者の場合", summary: "" },
    { category: "福祉士の社会福祉関連技術者の場合", summary: "" },
    { category: "音楽の実務分野の場合", summary: "" },
    { category: "美術、デザイン等の芸術分野の場合", summary: "" },
    { category: "その他、全般を通して", summary: "" },
  ],

  // Section 3: 著書・学術論文等 (3 empty rows for demo)
  publications: [
    {
      title: "",
      authorshipType: "",
      publicationDate: "",
      publisher: "",
      summary: "",
    },
    {
      title: "",
      authorshipType: "",
      publicationDate: "",
      publisher: "",
      summary: "",
    },
    {
      title: "",
      authorshipType: "",
      publicationDate: "",
      publisher: "",
      summary: "",
    },
  ],
};
