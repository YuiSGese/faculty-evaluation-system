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

function calcCategoryTotal(
  scores: Record<string, number>,
  items: { id: string }[]
): number {
  return items.reduce((sum, item) => sum + (scores[item.id] || 0), 0);
}

function calcGrandTotal(
  faculty: FacultyScoreData,
  categories: FacultyConfig["categories"]
): number {
  let total = faculty.resume + faculty.achievements;
  categories.forEach((cat) => {
    total += calcCategoryTotal(faculty.scores, cat.items);
  });
  return total;
}

export function ScoreTable({ config, data }: ScoreTableProps) {
  const getColSpan = (cat: FacultyConfig["categories"][0]) =>
    cat.items.length + (cat.hasTotal ? 1 : 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">
          {config.titleScore}
        </h1>
        <p className="text-text-muted mt-1">
          {config.role === "fulltime" ? "専任" : "非常勤"}教員の業績得点一覧
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-primary-light/20 overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="min-w-[2000px]">
            <TableHeader>
              <TableRow>
                <TableCell
                  as="th"
                  rowSpan={2}
                  className="bg-primary text-white font-bold text-xs"
                >
                  教職員番号
                </TableCell>
                <TableCell
                  as="th"
                  rowSpan={2}
                  className="bg-primary text-white font-bold text-xs"
                >
                  教職員氏名
                </TableCell>
                <TableCell
                  as="th"
                  rowSpan={2}
                  className="bg-primary text-white font-bold text-xs"
                >
                  所属
                </TableCell>
                <TableCell
                  as="th"
                  rowSpan={2}
                  className="bg-primary text-white font-bold text-xs"
                >
                  職位1
                </TableCell>
                <TableCell
                  as="th"
                  rowSpan={2}
                  className="bg-primary text-white font-bold text-xs"
                >
                  職位2
                </TableCell>
                <TableCell
                  as="th"
                  rowSpan={2}
                  className="bg-primary text-white font-bold text-xs"
                >
                  履歴書
                </TableCell>
                <TableCell
                  as="th"
                  rowSpan={2}
                  className="bg-primary text-white font-bold text-xs"
                >
                  業績書
                </TableCell>
                {config.categories.map((cat) => (
                  <TableCell
                    key={cat.id}
                    as="th"
                    colSpan={getColSpan(cat)}
                    className="bg-primary-dark text-white font-bold text-xs"
                  >
                    {cat.name}
                  </TableCell>
                ))}
                <TableCell
                  as="th"
                  rowSpan={2}
                  className="bg-orange-500 text-white font-bold text-xs"
                >
                  全体合計
                </TableCell>
              </TableRow>
              <TableRow>
                {config.categories.map((cat) => (
                  <React.Fragment key={cat.id}>
                    {cat.items.map((item) => (
                      <TableCell
                        key={item.id}
                        as="th"
                        className="bg-primary-light/30 text-text-primary font-medium text-xs whitespace-nowrap"
                      >
                        {item.name}
                      </TableCell>
                    ))}
                    {cat.hasTotal && (
                      <TableCell
                        as="th"
                        className="bg-primary text-white font-bold text-xs whitespace-nowrap"
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
              {data.map((faculty, idx) => (
                <TableRow
                  key={faculty.id}
                  className={
                    idx % 2 === 0 ? "bg-white" : "bg-background-subtle"
                  }
                >
                  <TableCell className="text-xs text-text-secondary">
                    {faculty.employeeNumber}
                  </TableCell>
                  <TableCell className="text-xs font-medium text-text-primary">
                    {faculty.employeeName}
                  </TableCell>
                  <TableCell className="text-xs text-text-secondary">
                    {faculty.department}
                  </TableCell>
                  <TableCell className="text-xs text-text-secondary">
                    {faculty.position1}
                  </TableCell>
                  <TableCell className="text-xs text-text-secondary">
                    {faculty.position2 || "-"}
                  </TableCell>
                  <TableCell className="text-xs text-center text-text-secondary">
                    {faculty.resume}
                  </TableCell>
                  <TableCell className="text-xs text-center text-text-secondary">
                    {faculty.achievements}
                  </TableCell>
                  {config.categories.map((cat) => (
                    <React.Fragment key={cat.id}>
                      {cat.items.map((item) => (
                        <TableCell
                          key={item.id}
                          className="text-xs text-center text-text-secondary"
                        >
                          {faculty.scores[item.id] || 0}
                        </TableCell>
                      ))}
                      {cat.hasTotal && (
                        <TableCell className="text-xs text-center font-bold bg-orange-50 text-orange-700">
                          {calcCategoryTotal(faculty.scores, cat.items)}
                        </TableCell>
                      )}
                    </React.Fragment>
                  ))}
                  <TableCell className="text-xs text-center font-bold bg-orange-500 text-white">
                    {calcGrandTotal(faculty, config.categories)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
