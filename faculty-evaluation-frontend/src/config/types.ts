// Định nghĩa types cho Faculty Config

export type RoleType = "fulltime" | "parttime";

export interface CategoryItem {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  items: CategoryItem[];
  hasTotal: boolean;
  totalLabel?: string;
  /**
   * Cờ đánh dấu category này không hiển thị trong bảng dữ liệu cuộn thông thường.
   * Thường dùng cho các category đã được hiển thị ở cột cố định (Sticky) như Basic Info.
   */
  isHiddenInTable?: boolean;
}

export interface RadarConfig {
  axes: number;
  categories: {
    id: string;
    name: string;
    maxValue: number;
  }[];
}

export interface FacultyConfig {
  role: RoleType;
  title: string;
  titleScore: string;
  titleSummary: string;
  titleRadar: string;
  categories: Category[];
  radar: RadarConfig;
}
