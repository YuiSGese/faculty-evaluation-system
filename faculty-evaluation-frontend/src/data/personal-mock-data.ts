import type { PersonalEvaluationData } from "@/types/personal";

export const MOCK_PERSONAL_EVALUATION: PersonalEvaluationData = {
  facultyInfo: {
    name: "山田 太郎",
    department: "音楽学部・音楽学科",
    employeeNumber: "T001",
    position: "教授",
  },
  year: 2025,
  goals: [
    {
      id: "1",
      // USER INPUT FIELDS - EMPTY for user to fill
      category1: "",
      selection: "",
      upperPolicy: "",
      personalGoal: "",
      progressMid: "",
      progressEnd: "",
      category2: "",
      individualScore: undefined,
      evaluation: undefined,

      // AI/SYSTEM GENERATED - Keep for demo
      aiScore: 85,
      aiEvaluation: 3,
      aiSummary:
        "授業改善に積極的に取り組んでおり、目標達成に向け着実に進捗している。",
    },
    {
      id: "2",
      // USER INPUT FIELDS - EMPTY
      category1: "",
      selection: "",
      upperPolicy: "",
      personalGoal: "",
      progressMid: "",
      progressEnd: "",
      category2: "",
      individualScore: undefined,
      evaluation: undefined,

      // AI/SYSTEM GENERATED
      aiScore: 70,
      aiEvaluation: 2,
      aiSummary: "論文執筆は進行中だが、校閲までには至っていない。",
    },
    {
      id: "3",
      // USER INPUT FIELDS - EMPTY
      category1: "",
      selection: "",
      upperPolicy: "",
      personalGoal: "",
      progressMid: "",
      progressEnd: "",
      category2: "",
      individualScore: undefined,
      evaluation: undefined,

      // AI/SYSTEM GENERATED
      aiScore: 90,
      aiEvaluation: 3,
      aiSummary: "地域連携活動に積極的に参与しており、良好な進捗をしている。",
    },
  ],

  // USER INPUT - EMPTY
  reflectionComment: "",

  // USER INPUT - EMPTY
  evaluatorPosition: "",
  evaluatorName: "",
  signatureDate: {
    year: "",
    month: "",
    day: "",
  },
};
