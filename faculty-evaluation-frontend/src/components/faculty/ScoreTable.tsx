"use client";

import React, { useMemo } from "react";
// Loại bỏ import Table component để dùng HTML thuần tránh xung đột style
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import type { FacultyConfig } from "@/config";

// --- Types & Interfaces ---

interface FacultyScoreData {
  id: string;
  employeeNumber: string;
  employeeName: string;
  department: string;
  position1: string;
  position2?: string;
  resume: number;
  achievements: number;
  scores: Record<string, number>;
}

interface ScoreTableProps {
  config: FacultyConfig;
  data: FacultyScoreData[];
}

interface StickyColConfig {
  id: string;
  label: string;
  width: number;
  left: number;
  isLast?: boolean;
}

// --- Constants ---

const STICKY_COLS: StickyColConfig[] = [
  { id: "employeeNumber", label: "教職員番号", width: 50, left: 0 },
  { id: "employeeName", label: "教職員氏名", width: 50, left: 50 },
  { id: "department", label: "所属", width: 50, left: 100 },
  { id: "position1", label: "職位1", width: 50, left: 150 },
  { id: "position2", label: "職位2", width: 50, left: 200 },
  { id: "resume", label: "履歴書", width: 50, left: 250 },
  { id: "achievements", label: "業績書", width: 50, left: 300, isLast: true },
];

const BG_COLORS = {
  header: "#1a202c",
  even: "#ffffff",
  odd: "#f8fafb",
};

// --- Helper Functions ---

function calcCategoryTotal(
  scores: Record<string, number>,
  items: { id: string }[]
): number {
  return items.reduce((sum, item) => sum + (scores[item.id] || 0), 0);
}

function calcGrandTotal(
  faculty: FacultyScoreData,
  visibleCategories: FacultyConfig["categories"]
): number {
  let total = faculty.resume + faculty.achievements;
  visibleCategories.forEach((cat) => {
    total += calcCategoryTotal(faculty.scores, cat.items);
  });
  return total;
}

function generateDummyData(count: number): FacultyScoreData[] {
  return Array.from({ length: count }).map((_, i) => ({
    id: `dummy-${i}`,
    employeeNumber: `TEST${1000 + i}`,
    employeeName: `テスト氏名${i + 1}`,
    department: "情報学部",
    position1: "教授",
    position2: i % 3 === 0 ? "学科長" : undefined,
    resume: Math.floor(Math.random() * 10),
    achievements: Math.floor(Math.random() * 50),
    scores: {
      "teaching-1": Math.floor(Math.random() * 10),
      "research-1": Math.floor(Math.random() * 20),
      "service-1": Math.floor(Math.random() * 5),
    },
  }));
}

export function ScoreTable({ config, data }: ScoreTableProps) {
  const visibleCategories = useMemo(() => {
    return config.categories.filter((cat) => !cat.isHiddenInTable);
  }, [config.categories]);

  const displayData = useMemo(() => {
    return data.length > 0 ? data : generateDummyData(20);
  }, [data]);

  const getColSpan = (cat: FacultyConfig["categories"][0]) =>
    cat.items.length + (cat.hasTotal ? 1 : 0);

  // Helper tạo style cho Sticky Column
  // FIX: Giảm default zIndex xuống 10 (thay vì 20) để thấp hơn Sidebar
  const getStickyStyle = (col: StickyColConfig, zIndex: number = 10) => ({
    width: `${col.width}px`,
    minWidth: `${col.width}px`,
    maxWidth: `${col.width}px`,
    left: `${col.left}px`,
    zIndex: zIndex,
    position: "sticky" as const,
    writingMode: "vertical-rl" as const,
    textOrientation: "upright" as const,
    letterSpacing: "1px",
  });
  const currentYear = new Date().getFullYear();

  // Chiều cao cố định cho dòng header đầu tiên
  const HEADER_ROW_1_HEIGHT = 42;

  return (
    <div className="space-y-6">
      <PageHeader title={config.titleScore} year={currentYear} />

      {/* Sử dụng div thường thay vì Card để kiểm soát hoàn toàn border và overflow */}
      <div className="border border-primary-light/30 rounded-xl bg-white shadow-sm overflow-hidden flex flex-col">
        {/* CONTAINER SCROLL DUY NHẤT: Xử lý cả cuộn dọc và ngang */}
        <div className="overflow-auto max-h-[calc(100vh-200px)] w-full relative scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {/* HTML TABLE THUẦN TÚY */}
          <table className="min-w-max border-separate border-spacing-0 w-full font-sans">
            <thead className="bg-white">
              {/* --- HEADER ROW 1 --- */}
              <tr>
                {/* 1. STICKY COLUMNS HEADER (Góc trên trái - Cố định cả 2 chiều) */}
                {STICKY_COLS.map((col) => (
                  <th
                    key={col.id}
                    rowSpan={2}
                    className={`
                      sticky top-0 left-0
                      bg-gradient-to-b from-primary-dark to-primary
                      text-white font-bold 
                      border-b border-r border-white/50
                      shadow-[1px_1px_0_0_rgba(255,255,255,0.2)]
                      align-middle text-center py-4
                      select-none
                      ${
                        col.isLast
                          ? "border-r-4 border-r-white/30 shadow-[4px_0_4px_-2px_rgba(0,0,0,0.1)]"
                          : ""
                      }
                      ${
                        col.id === "achievements"
                          ? "border-t border-white/40"
                          : ""
                      }
                    `}
                    // FIX: Giảm zIndex xuống 20 (thay vì 50)
                    style={{ ...getStickyStyle(col, 20), top: 0 }}
                  >
                    {col.label}
                  </th>
                ))}

                {/* 2. CATEGORIES SUPER-HEADERS (Sticky Top) */}
                {visibleCategories.map((cat, idx) => (
                  <th
                    key={cat.id}
                    colSpan={getColSpan(cat)}
                    className={`
                      sticky top-0
                      bg-gradient-to-r from-primary-dark to-primary
                      text-white font-bold text-sm
                      border-b border-r border-white/50
                      ${idx > 0 ? "border-l-2 border-l-white/20" : ""}
                    `}
                    // FIX: Giảm zIndex xuống 15 (thay vì 40)
                    style={{
                      height: `${HEADER_ROW_1_HEIGHT}px`,
                      zIndex: 15,
                    }}
                  >
                    {cat.name}
                  </th>
                ))}

                {/* 3. GRAND TOTAL HEADER (Sticky Top) */}
                <th
                  rowSpan={2}
                  className="sticky top-0 bg-gradient-to-br from-primary-dark to-primary text-white font-bold text-sm border-l-4 border-l-white/30 border-b border-white/50"
                  // FIX: Giảm zIndex xuống 15 (thay vì 40)
                  style={{ zIndex: 15 }}
                >
                  全体合計
                </th>
              </tr>

              {/* --- HEADER ROW 2 --- */}
              <tr>
                {/* 4. CATEGORIES SUB-HEADERS (Sticky Top - Dính dưới dòng 1) */}
                {visibleCategories.map((cat) => (
                  <React.Fragment key={cat.id}>
                    {cat.items.map((item) => (
                      <th
                        key={item.id}
                        className="
                          sticky
                          bg-primary-light/10 backdrop-blur-sm
                          text-text-primary font-semibold 
                          text-sm whitespace-normal break-words leading-tight
                          w-24 min-w-[6rem] max-w-[6rem]
                          border-b border-r border-primary-light/20 
                          align-bottom pb-2 px-1
                        "
                        // FIX: Giảm zIndex xuống 12 (thay vì 30)
                        style={{
                          top: `${HEADER_ROW_1_HEIGHT}px`,
                          zIndex: 12,
                        }}
                      >
                        {item.name}
                      </th>
                    ))}

                    {cat.hasTotal && (
                      <th
                        className="
                          sticky
                          bg-primary-lightest 
                          text-text-primary font-bold 
                          text-sm whitespace-nowrap 
                          border-b border-r border-primary-light/30 
                          align-bottom pb-2 px-2
                        "
                        // FIX: Giảm zIndex xuống 12 (thay vì 30)
                        style={{
                          top: `${HEADER_ROW_1_HEIGHT}px`,
                          zIndex: 12,
                        }}
                      >
                        {cat.name}
                        <br />
                        合計
                      </th>
                    )}
                  </React.Fragment>
                ))}
              </tr>
            </thead>

            <tbody className="bg-white">
              {displayData.map((faculty, idx) => {
                const isEven = idx % 2 === 0;
                const rowBgColor = isEven ? BG_COLORS.even : BG_COLORS.odd;
                const rowClass = isEven ? "bg-white" : "bg-background-subtle";

                return (
                  <tr
                    key={faculty.id}
                    className={`${rowClass} hover:bg-primary-lightest/50 transition-colors group`}
                  >
                    {/* 5. STICKY DATA CELLS (Sticky Left) */}
                    {STICKY_COLS.map((col) => {
                      let value: string | number = "-";
                      if (col.id === "employeeNumber")
                        value = faculty.employeeNumber;
                      else if (col.id === "employeeName")
                        value = faculty.employeeName;
                      else if (col.id === "department")
                        value = faculty.department;
                      else if (col.id === "position1")
                        value = faculty.position1;
                      else if (col.id === "position2")
                        value = faculty.position2 || "-";
                      else if (col.id === "resume") value = faculty.resume;
                      else if (col.id === "achievements")
                        value = faculty.achievements;

                      return (
                        <td
                          key={col.id}
                          className={`
                            text-sm border-b border-r border-primary-light/20 py-4
                            ${
                              col.id === "employeeName"
                                ? "font-bold text-text-primary"
                                : "text-text-secondary"
                            }
                            text-center align-middle
                            ${
                              col.isLast
                                ? "border-r-4 border-r-primary-light/10 shadow-[4px_0_4px_-2px_rgba(0,0,0,0.05)]"
                                : ""
                            }
                          `}
                          // FIX: Giảm zIndex xuống 10 (thay vì 20)
                          style={{
                            ...getStickyStyle(col, 10),
                            backgroundColor: rowBgColor,
                          }}
                        >
                          <span className="inline-block py-2">{value}</span>
                        </td>
                      );
                    })}

                    {/* 6. SCROLLABLE DATA CELLS */}
                    {visibleCategories.map((cat) => (
                      <React.Fragment key={cat.id}>
                        {cat.items.map((item) => (
                          <td
                            key={item.id}
                            className="text-sm text-center text-text-secondary border-b border-r border-primary-light/20 px-1"
                          >
                            {faculty.scores?.[item.id] || 0}
                          </td>
                        ))}
                        {cat.hasTotal && (
                          <td className="text-sm text-center font-bold bg-primary-lightest text-text-primary border-b border-r border-primary-light/30">
                            {calcCategoryTotal(faculty.scores || {}, cat.items)}
                          </td>
                        )}
                      </React.Fragment>
                    ))}

                    {/* 7. GRAND TOTAL DATA CELL */}
                    <td className="text-base text-center font-extrabold bg-primary-lightest/50 text-text-primary border-l-4 border-primary-light/20 border-b">
                      {calcGrandTotal(faculty, visibleCategories)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
