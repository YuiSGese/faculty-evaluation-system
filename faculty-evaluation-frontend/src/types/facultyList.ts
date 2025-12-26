// src/types/facultyList.ts

export type SubmissionStatus =
  | "未提出" // Not submitted
  | "提出済" // Submitted
  | "承認済"; // Approved

export interface FacultyListItem {
  id: string;
  employeeNumber: string;
  name: string;
  department: string;
  position: string;
  status: SubmissionStatus;
  progress: number; // 0-100
  aiScore?: number;
  lastUpdated: string;
  submittedDate?: string;
}

export interface FacultyListData {
  fulltime: FacultyListItem[];
  parttime: FacultyListItem[];
  completed: FacultyListItem[];
  pending: FacultyListItem[];
}
