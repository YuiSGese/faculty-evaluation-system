"use client";

import React, { useMemo } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/table";
import { Card } from "@/components/ui/Card";
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

// Hàm tính tổng: Bao gồm cả Resume/Achievements (Sticky) + Các Category khác (Visible)
function calcGrandTotal(
  faculty: FacultyScoreData,
  visibleCategories: FacultyConfig["categories"]
): number {
  // Luôn cộng Resume và Achievements vì nó nằm ở Sticky Column
  let total = faculty.resume + faculty.achievements;

  // Cộng thêm điểm của các category được hiển thị (Visible)
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
  // CHUẨN: Lọc categories dựa trên 'isHiddenInTable' từ config
  const visibleCategories = useMemo(() => {
    return config.categories.filter((cat) => !cat.isHiddenInTable);
  }, [config.categories]);

  const displayData = useMemo(() => {
    return data.length > 0 ? data : generateDummyData(20);
  }, [data]);

  const getColSpan = (cat: FacultyConfig["categories"][0]) =>
    cat.items.length + (cat.hasTotal ? 1 : 0);

  const getStickyStyle = (col: StickyColConfig, zIndex: number = 20) => ({
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

  return (
    <div className="space-y-6">
      <div className="border-b border-primary-light/30 pb-4 mt-6">
        <h1 className="text-3xl font-bold text-text-primary text-center">
          {config.titleScore}
        </h1>
      </div>

      <Card
        variant="elevated"
        padding="none"
        allowStickyChildren={true}
        className="overflow-hidden"
      >
        <div className="overflow-x-auto overflow-y-visible max-h-[calc(100vh-200px)]">
          <Table
            className="min-w-max border-separate border-spacing-0"
            containerClassName="overflow-visible"
          >
            <TableHeader sticky={false}>
              <TableRow>
                {/* STICKY COLUMNS HEADER */}
                {STICKY_COLS.map((col) => (
                  <TableCell
                    key={col.id}
                    as="th"
                    rowSpan={2}
                    className={`
                      sticky top-0 
                      bg-gradient-to-b from-primary-dark to-primary
                      text-white font-bold 
                      border-b border-r border-white
                      shadow-[1px_0_0_0_rgba(255,255,255,0.2)]
                      align-middle text-center py-4
                      text-sm
                      ${
                        col.isLast
                          ? "border-r-4 border-r-white/30 shadow-[4px_0_4px_-2px_rgba(0,0,0,0.1)]"
                          : ""
                      }
                    `}
                    style={getStickyStyle(col, 30)}
                  >
                    {col.label}
                  </TableCell>
                ))}

                {/* CATEGORIES SUPER-HEADERS (Dùng visibleCategories) */}
                {visibleCategories.map((cat, idx) => (
                  <TableCell
                    key={cat.id}
                    as="th"
                    colSpan={getColSpan(cat)}
                    className={`
                      sticky top-0 z-20 
                      bg-gradient-to-r from-primary-dark to-primary
                      text-white font-bold text-sm
                      border-b border-r border-white
                      h-[42px]
                      ${idx > 0 ? "border-l-2 border-l-white/20" : ""}
                    `}
                  >
                    {cat.name}
                  </TableCell>
                ))}

                {/* GRAND TOTAL HEADER */}
                <TableCell
                  as="th"
                  rowSpan={2}
                  className="sticky top-0 z-20 bg-gradient-to-br from-primary-dark to-primary text-white font-bold text-sm border-l-4 border-l-white/30 border-b border-white"
                >
                  全体合計
                </TableCell>
              </TableRow>

              <TableRow>
                {/* CATEGORIES SUB-HEADERS (Dùng visibleCategories) */}
                {visibleCategories.map((cat) => (
                  <React.Fragment key={cat.id}>
                    {cat.items.map((item) => (
                      <TableCell
                        key={item.id}
                        as="th"
                        className="
                          sticky top-[42px] z-20 
                          bg-primary-light/10 backdrop-blur-sm
                          text-text-primary font-semibold 
                          text-sm whitespace-normal break-words leading-tight
                          w-24 min-w-[6rem] max-w-[6rem]
                          border-b border-r border-primary-light/20 
                          align-bottom pb-2 px-1
                        "
                      >
                        {item.name}
                      </TableCell>
                    ))}

                    {cat.hasTotal && (
                      <TableCell
                        as="th"
                        className="
                          sticky top-[42px] z-20 
                          bg-primary-lightest 
                          text-text-primary-dark font-bold 
                          text-sm whitespace-nowrap 
                          border-b border-r border-primary-light/30 
                          align-bottom pb-2 px-2
                        "
                      >
                        {cat.name}
                        <br />
                        合計
                      </TableCell>
                    )}
                  </React.Fragment>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {displayData.map((faculty, idx) => {
                const isEven = idx % 2 === 0;
                const rowBgColor = isEven ? BG_COLORS.even : BG_COLORS.odd;
                const rowClass = isEven ? "bg-white" : "bg-background-subtle";

                return (
                  <TableRow
                    key={faculty.id}
                    className={`${rowClass} hover:bg-primary-lightest/50 transition-colors group`}
                  >
                    {/* STICKY DATA CELLS */}
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
                        <TableCell
                          key={col.id}
                          className={`
                            text-sm border-b border-r border-primary-light/20 py-4
                            ${
                              col.id === "employeeName"
                                ? "font-bold text-text-text-primary-dark"
                                : "text-text-secondary"
                            }
                            text-center align-middle
                            ${
                              col.isLast
                                ? "border-r-4 border-r-primary-light/10 shadow-[4px_0_4px_-2px_rgba(0,0,0,0.05)]"
                                : ""
                            }
                          `}
                          style={{
                            ...getStickyStyle(col, 10),
                            backgroundColor: rowBgColor,
                          }}
                        >
                          <span className="inline-block py-2">{value}</span>
                        </TableCell>
                      );
                    })}

                    {/* SCROLLABLE DATA CELLS (Dùng visibleCategories) */}
                    {visibleCategories.map((cat) => (
                      <React.Fragment key={cat.id}>
                        {cat.items.map((item) => (
                          <TableCell
                            key={item.id}
                            className="text-sm text-center text-text-secondary border-b border-r border-primary-light/20 px-1"
                          >
                            {faculty.scores?.[item.id] || 0}
                          </TableCell>
                        ))}
                        {cat.hasTotal && (
                          <TableCell className="text-sm text-center font-bold bg-primary-lightest text-text-primary-dark border-b border-r border-primary-light/30">
                            {calcCategoryTotal(faculty.scores || {}, cat.items)}
                          </TableCell>
                        )}
                      </React.Fragment>
                    ))}

                    {/* GRAND TOTAL DATA CELL */}
                    <TableCell className="text-base text-center font-extrabold bg-primary-lightest/50 text-primary-dark border-l-4 border-primary-light/20 border-b">
                      {calcGrandTotal(faculty, visibleCategories)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
