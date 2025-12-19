import type { FacultyConfig } from "./types";

export const FULLTIME_CONFIG: FacultyConfig = {
  role: "fulltime",
  title: "専任教員業績評価表",
  titleScore: "専任教員業績（得点）",
  titleSummary: "専任教員業績（合計）",
  titleRadar: "専任教員の評価",

  categories: [
    {
      id: "basicInfo",
      name: "基本情報",
      items: [
        { id: "resume", name: "履歴書" },
        { id: "achievements", name: "業績書" },
      ],
      hasTotal: false,
    },
    {
      id: "booksPapers",
      name: "著書・論文",
      items: [
        { id: "bookSingle", name: "著書 単著" },
        { id: "bookJoint", name: "著書 共著" },
        { id: "paperSingle", name: "論文 単著" },
        { id: "paperJoint", name: "論文 共著" },
        { id: "textbook", name: "教科書" },
      ],
      hasTotal: true,
      totalLabel: "著書・論文 合計",
    },
    {
      id: "education",
      name: "教育関連",
      items: [
        { id: "material", name: "教材" },
        { id: "practice", name: "実践例" },
        { id: "translation", name: "翻訳通訳" },
      ],
      hasTotal: true,
      totalLabel: "教育関連 合計",
    },
    {
      id: "conference",
      name: "学会発表",
      items: [
        { id: "presentation", name: "学会発表" },
        { id: "report", name: "報告等" },
      ],
      hasTotal: true,
      totalLabel: "学会発表 合計",
    },
    {
      id: "music",
      name: "音楽関連",
      items: [
        { id: "recital", name: "リサイタル" },
        { id: "performance", name: "演奏" },
        { id: "conducting", name: "指揮" },
        { id: "competition", name: "コンクール" },
        { id: "composition", name: "作曲" },
        { id: "recording", name: "録音" },
      ],
      hasTotal: true,
      totalLabel: "音楽関連 合計",
    },
    {
      id: "art",
      name: "芸術関連",
      items: [
        { id: "direction", name: "演出・プロデュース" },
        { id: "planning", name: "企画・プロデュース" },
        { id: "soloExhibition", name: "個展" },
        { id: "publicExhibition", name: "公募展" },
      ],
      hasTotal: true,
      totalLabel: "芸術関連 合計",
    },
    {
      id: "socialContribution",
      name: "社会貢献",
      items: [
        { id: "award", name: "受賞" },
        { id: "director", name: "理事等" },
        { id: "externalCommittee", name: "学外委員会" },
        { id: "externalLecture", name: "学外講演" },
      ],
      hasTotal: true,
      totalLabel: "社会貢献 合計",
    },
    {
      id: "universityManagement",
      name: "大学運営",
      items: [
        { id: "deanFaculty", name: "学部長" },
        { id: "deanDepartment", name: "学科長" },
        { id: "chief", name: "主任" },
      ],
      hasTotal: true,
      totalLabel: "大学運営 合計",
    },
    {
      id: "externalFunding",
      name: "外部資金",
      items: [
        { id: "kakenhi", name: "科研" },
        { id: "otherFunding", name: "外部資金" },
      ],
      hasTotal: true,
      totalLabel: "外部資金 合計",
    },
  ],

  radar: {
    axes: 8,
    categories: [
      { id: "booksPapers", name: "著書論文", maxValue: 50 },
      { id: "education", name: "教育関連", maxValue: 40 },
      { id: "conference", name: "学会発表", maxValue: 80 },
      { id: "music", name: "音楽関連", maxValue: 160 },
      { id: "art", name: "芸術関連", maxValue: 120 },
      { id: "socialContribution", name: "社会貢献", maxValue: 50 },
      { id: "universityManagement", name: "大学運営", maxValue: 30 },
      { id: "externalFunding", name: "外部資金", maxValue: 50 },
    ],
  },
};
