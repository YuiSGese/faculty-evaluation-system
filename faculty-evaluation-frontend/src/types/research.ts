// src/types/research.ts

// Faculty Info (simple version for Research page)
export interface ResearchFacultyInfo {
  name: string;
  department: string;
  employeeNumber: string;
  position: string;
}

// Education Item
export interface EducationItem {
  title: string;
  date: string;
  summary: string;
}

// Education Record (4 categories)
export interface EducationRecord {
  category: string;
  items: EducationItem[];
}

// Job Record (10 categories) - UPDATED with date field
export interface JobRecord {
  category: string;
  summary: string;
  date?: string; // ← THÊM FIELD NÀY
}

// Research Publication
export interface ResearchPublication {
  title: string;
  authorshipType: string; // "単著" | "共著" | ""
  publicationDate: string;
  publisher: string;
  summary: string;
}

// Research Record Data
export interface ResearchRecordData {
  facultyInfo: ResearchFacultyInfo;
  year: number;
  educationRecords: EducationRecord[];
  jobRecords: JobRecord[];
  publications: ResearchPublication[];
}
