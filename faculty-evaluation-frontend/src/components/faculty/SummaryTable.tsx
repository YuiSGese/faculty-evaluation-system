"use client";

import React, { useMemo } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/table";
import type { FacultyConfig } from "@/config";

// --- Types & Interfaces ---

interface FacultySummaryData {
  id: string;
  employeeNumber: string;
  employeeName: string;
  department: string;
  position1: string;
  position2?: string;
  totals: Record<string, number>;
}

interface SummaryTableProps {
  config: FacultyConfig;
  data: FacultySummaryData[];
}

const BG_COLORS = {
  even: "#ffffff", // trắng
  odd: "#f8fafc", // slate-50
};

// --- Helper Functions ---

// Cập nhật hàm tính tổng: Sử dụng danh sách categories đã lọc (visible only)
function calcGrandTotal(
  totals: Record<string, number>,
  visibleCategories: FacultyConfig["categories"]
): number {
  return visibleCategories.reduce((sum, cat) => sum + (totals[cat.id] || 0), 0);
}

// Hàm tạo dữ liệu giả
function generateDummyData(count: number): FacultySummaryData[] {
  return Array.from({ length: count }).map((_, i) => ({
    id: `dummy-${i}`,
    employeeNumber: `TEST${1000 + i}`,
    employeeName: `テスト氏名${i + 1}`,
    department: "情報学部",
    position1: "教授",
    position2: i % 3 === 0 ? "学科長" : undefined,
    totals: {
      booksPapers: Math.floor(Math.random() * 50),
      education: Math.floor(Math.random() * 40),
    },
  }));
}

export function SummaryTable({ config, data }: SummaryTableProps) {
  // CHUẨN: Lọc categories dựa trên 'isHiddenInTable' thay vì hardcode tên
  const visibleCategories = useMemo(() => {
    return config.categories.filter((cat) => !cat.isHiddenInTable);
  }, [config.categories]);

  // Merge dữ liệu
  const displayData = useMemo(() => {
    const dummy = generateDummyData(50);
    return [...data, ...dummy];
  }, [data]);

  // Tính toán thống kê (Dựa trên danh sách category HIỂN THỊ)
  const allTotals = displayData.map((f) =>
    calcGrandTotal(f.totals, visibleCategories)
  );
  const avg =
    allTotals.length > 0
      ? Math.round(allTotals.reduce((a, b) => a + b, 0) / allTotals.length)
      : 0;
  const max = allTotals.length > 0 ? Math.max(...allTotals) : 0;
  const min = allTotals.length > 0 ? Math.min(...allTotals) : 0;

  return (
    <div className="space-y-6">
      {/* Tiêu đề trang */}
      <div className="border-b border-primary-light/30 pb-4 mt-6">
        <h1 className="text-2xl font-bold text-text-primary">
          {config.titleSummary}
        </h1>
        <p className="text-text-muted mt-1">
          {config.role === "fulltime" ? "専任" : "非常勤"}教員の業績合計一覧
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-primary-light/20 p-4">
          <p className="text-sm text-text-muted">総人数</p>
          <p className="text-2xl font-bold text-text-primary">
            {displayData.length}名
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-primary-light/20 p-4">
          <p className="text-sm text-text-muted">平均得点</p>
          <p className="text-2xl font-bold text-primary">{avg}点</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-primary-light/20 p-4">
          <p className="text-sm text-text-muted">最高得点</p>
          <p className="text-2xl font-bold text-green-600">{max}点</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-primary-light/20 p-4">
          <p className="text-sm text-text-muted">最低得点</p>
          <p className="text-2xl font-bold text-orange-600">{min}点</p>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl shadow-sm border border-primary-light/20 overflow-visible">
        <Table
          className="min-w-max border-collapse"
          containerClassName="!overflow-visible"
        >
          <TableHeader sticky={false}>
            <TableRow className="sticky top-0 z-30 bg-gradient-to-r from-primary-dark to-primary shadow-md border-b border-white/20">
              <TableCell
                as="th"
                className="text-white font-bold text-sm text-center py-4 px-4 border-r border-white/20"
              >
                教職員番号
              </TableCell>
              <TableCell
                as="th"
                className="text-white font-bold text-sm text-center py-4 px-4 border-r border-white/20"
              >
                教職員氏名
              </TableCell>
              <TableCell
                as="th"
                className="text-white font-bold text-sm text-center py-4 px-4 border-r border-white/20"
              >
                所属
              </TableCell>
              <TableCell
                as="th"
                className="text-white font-bold text-sm text-center py-4 px-4 border-r border-white/20"
              >
                職名1
              </TableCell>
              <TableCell
                as="th"
                className="text-white font-bold text-sm text-center py-4 px-4 border-r border-white/20"
              >
                職名2
              </TableCell>

              {/* CHUẨN: Chỉ render các category được phép hiển thị (visibleCategories) */}
              {visibleCategories.map((cat) => (
                <TableCell
                  key={cat.id}
                  as="th"
                  className="text-white font-bold text-sm text-center py-4 px-4 border-r border-white/20 whitespace-nowrap"
                >
                  {cat.name}
                  <br />
                  合計
                </TableCell>
              ))}

              <TableCell
                as="th"
                className="text-white font-bold text-sm text-center py-4 px-4 border-l-2 border-white/30"
              >
                全体合計
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {displayData.map((faculty, idx) => {
              const isEven = idx % 2 === 0;
              const rowClass = isEven ? "bg-white" : "bg-background-subtle";

              return (
                <TableRow
                  key={faculty.id}
                  className={`${rowClass} hover:bg-primary-lightest/50 transition-colors border-b border-primary-light/10`}
                >
                  <TableCell className="text-sm text-center text-text-secondary py-3 border-r border-primary-light/10">
                    {faculty.employeeNumber}
                  </TableCell>
                  <TableCell className="text-sm font-medium text-text-primary text-center py-3 border-r border-primary-light/10">
                    {faculty.employeeName}
                  </TableCell>
                  <TableCell className="text-sm text-center text-text-secondary py-3 border-r border-primary-light/10">
                    {faculty.department}
                  </TableCell>
                  <TableCell className="text-sm text-center text-text-secondary py-3 border-r border-primary-light/10">
                    {faculty.position1}
                  </TableCell>
                  <TableCell className="text-sm text-center text-text-secondary py-3 border-r border-primary-light/10">
                    {faculty.position2 || "-"}
                  </TableCell>

                  {/* CHUẨN: Chỉ render data cho các category hiển thị */}
                  {visibleCategories.map((cat) => (
                    <TableCell
                      key={cat.id}
                      className="text-sm text-center font-medium text-text-primary py-3 border-r border-primary-light/10"
                    >
                      {faculty.totals[cat.id] || 0}
                    </TableCell>
                  ))}

                  <TableCell className="text-sm text-center font-bold text-primary-dark py-3 bg-primary-lightest/30 border-l-2 border-primary-light/20">
                    {calcGrandTotal(faculty.totals, visibleCategories)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
