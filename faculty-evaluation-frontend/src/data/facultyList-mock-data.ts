// src/data/facultyList-mock-data.ts
import type { FacultyListData } from "@/types/facultyList";

export const MOCK_FACULTY_LIST: FacultyListData = {
  fulltime: [
    {
      id: "T001",
      employeeNumber: "T001",
      name: "山田 太郎",
      department: "音楽学部・音楽学科",
      position: "教授",
      status: "提出済",
      progress: 100,
      aiScore: 258,
      lastUpdated: "2025/12/20",
      submittedDate: "2025/12/20",
    },
    {
      id: "T002",
      employeeNumber: "T002",
      name: "佐藤 花子",
      department: "美術学部・美術学科",
      position: "准教授",
      status: "未提出",
      progress: 0,
      lastUpdated: "2025/12/10",
    },
    {
      id: "T003",
      employeeNumber: "T003",
      name: "鈴木 一郎",
      department: "デザイン学部・デザイン学科",
      position: "講師",
      status: "未提出",
      progress: 65,
      lastUpdated: "2025/12/22",
    },
    // Add more mock data...
  ],
  parttime: [
    {
      id: "P001",
      employeeNumber: "P001",
      name: "田中 美咲",
      department: "音楽学部・音楽学科",
      position: "非常勤講師",
      status: "提出済",
      progress: 100,
      aiScore: 182,
      lastUpdated: "2025/12/19",
      submittedDate: "2025/12/19",
    },
    {
      id: "P002",
      employeeNumber: "P002",
      name: "高橋 誠",
      department: "美術学部・美術学科",
      position: "非常勤講師",
      status: "未提出",
      progress: 0,
      lastUpdated: "2025/12/05",
    },
    // Add more mock data...
  ],
  completed: [], // Will be filtered from above
  pending: [], // Will be filtered from above
};

// Helper to get completed/pending lists
export function getCompletedFaculty(): typeof MOCK_FACULTY_LIST.fulltime {
  return [
    ...MOCK_FACULTY_LIST.fulltime.filter(
      (f) => f.status === "提出済" || f.status === "承認済"
    ),
    ...MOCK_FACULTY_LIST.parttime.filter(
      (f) => f.status === "提出済" || f.status === "承認済"
    ),
  ];
}

export function getPendingFaculty(): typeof MOCK_FACULTY_LIST.fulltime {
  return [
    ...MOCK_FACULTY_LIST.fulltime.filter((f) => f.status === "未提出"),
    ...MOCK_FACULTY_LIST.parttime.filter((f) => f.status === "未提出"),
  ];
}
