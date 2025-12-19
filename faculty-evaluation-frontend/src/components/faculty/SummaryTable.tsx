"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/table";
import type { FacultyConfig } from "@/config";

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

function calcGrandTotal(totals: Record<string, number>): number {
  return Object.values(totals).reduce((sum, val) => sum + val, 0);
}

export function SummaryTable({ config, data }: SummaryTableProps) {
  const allTotals = data.map((f) => calcGrandTotal(f.totals));
  const avg = Math.round(allTotals.reduce((a, b) => a + b, 0) / data.length);
  const max = Math.max(...allTotals);
  const min = Math.min(...allTotals);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">
          {config.titleSummary}
        </h1>
        <p className="text-text-muted mt-1">
          {config.role === "fulltime" ? "専任" : "非常勤"}教員の業績合計一覧
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-primary-light/20 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell
                  as="th"
                  className="bg-primary text-white font-bold text-sm"
                >
                  教職員番号
                </TableCell>
                <TableCell
                  as="th"
                  className="bg-primary text-white font-bold text-sm"
                >
                  教職員氏名
                </TableCell>
                <TableCell
                  as="th"
                  className="bg-primary text-white font-bold text-sm"
                >
                  所属
                </TableCell>
                <TableCell
                  as="th"
                  className="bg-primary text-white font-bold text-sm"
                >
                  職名1
                </TableCell>
                <TableCell
                  as="th"
                  className="bg-primary text-white font-bold text-sm"
                >
                  職名2
                </TableCell>
                {config.categories.map((cat) => (
                  <TableCell
                    key={cat.id}
                    as="th"
                    className="bg-primary-dark text-white font-bold text-sm whitespace-nowrap"
                  >
                    {cat.name}
                    <br />
                    合計
                  </TableCell>
                ))}
                <TableCell
                  as="th"
                  className="bg-orange-500 text-white font-bold text-sm"
                >
                  全体合計
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((faculty, idx) => (
                <TableRow
                  key={faculty.id}
                  className={
                    idx % 2 === 0
                      ? "bg-white hover:bg-primary-lightest/20"
                      : "bg-background-subtle hover:bg-primary-lightest/20"
                  }
                >
                  <TableCell className="text-sm text-text-secondary">
                    {faculty.employeeNumber}
                  </TableCell>
                  <TableCell className="text-sm font-medium text-text-primary">
                    {faculty.employeeName}
                  </TableCell>
                  <TableCell className="text-sm text-text-secondary">
                    {faculty.department}
                  </TableCell>
                  <TableCell className="text-sm text-text-secondary">
                    {faculty.position1}
                  </TableCell>
                  <TableCell className="text-sm text-text-secondary">
                    {faculty.position2 || "-"}
                  </TableCell>
                  {config.categories.map((cat) => (
                    <TableCell
                      key={cat.id}
                      className="text-sm text-center font-medium text-text-primary"
                    >
                      {faculty.totals[cat.id] || 0}
                    </TableCell>
                  ))}
                  <TableCell className="text-sm text-center font-bold bg-orange-100 text-orange-800">
                    {calcGrandTotal(faculty.totals)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-primary-light/20 p-4">
          <p className="text-sm text-text-muted">総人数</p>
          <p className="text-2xl font-bold text-text-primary">
            {data.length}名
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
    </div>
  );
}
