"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui";
import { Badge } from "@/components/ui";
import type { FacultyConfig } from "@/config";

interface FacultyInfo {
  employeeNumber: string;
  employeeName: string;
  department: string;
  position1: string;
  position2?: string;
}

interface ScoreData {
  prevPrevYear: number | null;
  prevYear: number | null;
  aiScore: number | null;
  aiScoreThisYear: number | null;
  evaluation: string;
  aiSummary: string;
}

interface PerformanceTableProps {
  config: FacultyConfig;
  facultyInfo: FacultyInfo;
  scores: Record<string, ScoreData>;
}

function InfoSection({ info }: { info: FacultyInfo }) {
  const fields = [
    { label: "教職員番号", value: info.employeeNumber },
    { label: "教職員氏名", value: info.employeeName },
    { label: "所属", value: info.department },
    { label: "職名1", value: info.position1 },
    { label: "職名2", value: info.position2 || "-" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      {fields.map((f) => (
        <div key={f.label} className="space-y-1">
          <div className="text- text-slate-500 font-medium">{f.label}</div>
          <div className="text-sm font-semibold text-text-primary bg-primary-lightest/50 px-3 py-2 rounded-lg border border-primary-light/30">
            {f.value}
          </div>
        </div>
      ))}
    </div>
  );
}

function calcTotal(
  items: { id: string }[],
  scores: Record<string, ScoreData>,
  field: keyof ScoreData
): number {
  return items.reduce((sum, item) => {
    const val = scores[item.id]?.[field];
    return sum + (typeof val === "number" ? val : 0);
  }, 0);
}

function getCategoryColor(index: number): string {
  const colors = [
    "var(--primary-dark)", // dark green
    "var(--primary)", // medium green
  ];
  return colors[index % colors.length];
}

function getEvalBadge(evaluation?: string) {
  type EvaluationVariant = "S" | "A" | "B" | "C" | "completed" | "default";

  const variantMap: Record<string, EvaluationVariant> = {
    S: "S",
    A: "A",
    B: "B",
    C: "C",
    済: "completed",
  };

  const variant = variantMap[evaluation || ""] || "default";
  return (
    <Badge variant={variant} size="md">
      {evaluation || "-"}
    </Badge>
  );
}

export function PerformanceTable({
  config,
  facultyInfo,
  scores,
}: PerformanceTableProps) {
  const [stickyHeader, setStickyHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setStickyHeader(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const allItems = config.categories.flatMap((c) => c.items);
  const grandTotals = {
    prevPrevYear: calcTotal(allItems, scores, "prevPrevYear"),
    prevYear: calcTotal(allItems, scores, "prevYear"),
    aiScore: calcTotal(allItems, scores, "aiScore"),
    aiScoreThisYear: calcTotal(allItems, scores, "aiScoreThisYear"),
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="border-b border-primary-light/30 pb-4">
        <h1 className="text-3xl font-bold text-text-primary text-center">
          {config.title}
        </h1>
      </div>

      {/* Faculty Info */}
      <InfoSection info={facultyInfo} />

      {/* Main Table */}
      <Card variant="elevated" padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 z-30 shadow-md">
              <tr className="bg-gradient-to-r from-primary-dark to-primary text-white font-bold">
                <th className="px-5 py-4 text-center font-semibold w-32 border-r border-white">
                  区分
                </th>
                <th className="px-5 py-4 text-center font-semibold w-44 border-r border-white">
                  評価項目
                </th>
                <th className="px-4 py-4 text-center font-semibold w-24 border-r border-white">
                  前々年度
                </th>
                <th className="px-4 py-4 text-center font-semibold w-24 border-r border-white">
                  前年度
                </th>
                <th className="px-4 py-4 text-center font-semibold w-28 border-r border-white">
                  AIスコア
                </th>
                <th className="px-4 py-4 text-center font-semibold w-32 border-r border-white">
                  今年度AIスコア
                </th>
                <th className="px-4 py-4 text-center font-semibold w-28 border-r border-white">
                  今年度評価
                </th>
                <th className="px-5 py-4 text-center   font-semibold">
                  AI評価概要
                </th>
              </tr>
            </thead>

            <tbody>
              {config.categories.map((category, catIdx) => {
                const itemCount =
                  category.items.length + (category.hasTotal ? 1 : 0);
                const categoryColor = getCategoryColor(catIdx);
                const categoryTotal = category.hasTotal
                  ? {
                      prevPrevYear: calcTotal(
                        category.items,
                        scores,
                        "prevPrevYear"
                      ),
                      prevYear: calcTotal(category.items, scores, "prevYear"),
                      aiScore: calcTotal(category.items, scores, "aiScore"),
                      aiScoreThisYear: calcTotal(
                        category.items,
                        scores,
                        "aiScoreThisYear"
                      ),
                    }
                  : null;

                return (
                  <React.Fragment key={category.id}>
                    {category.items.map((item, idx) => {
                      const s = scores[item.id];
                      const isFirst = idx === 0;

                      return (
                        <tr
                          key={item.id}
                          className={`border-b border-slate-100 hover:bg-primary-lightest/20 transition-colors ${
                            !category.hasTotal &&
                            idx === category.items.length - 1
                              ? "border-b-4 border-primary/30"
                              : ""
                          }`}
                        >
                          {isFirst && (
                            <td
                              rowSpan={itemCount}
                              className="px-5 py-4 font-bold text-text-primary text-base align-middle text-center border-r border-slate-200"
                            >
                              <span>{category.name}</span>
                            </td>
                          )}
                          <td className="px-5 py-4 text-slate-700 font-medium border-r border-slate-100">
                            {item.name}
                          </td>
                          <td className="px-4 py-4 text-center text-slate-600 border-r border-slate-100">
                            {s?.prevPrevYear ?? "-"}
                          </td>
                          <td className="px-4 py-4 text-center text-slate-600 border-r border-slate-100">
                            {s?.prevYear ?? "-"}
                          </td>
                          <td className="px-4 py-4 text-center text-text-primary font-semibold border-r border-slate-100">
                            {s?.aiScore ?? "-"}
                          </td>
                          <td className="px-4 py-4 text-center text-text-primary font-bold border-r border-slate-100">
                            {s?.aiScoreThisYear ?? "-"}
                          </td>
                          <td className="px-4 py-4 text-center border-r border-slate-100">
                            {getEvalBadge(s?.evaluation)}
                          </td>
                          <td className="px-5 py-4 text-slate-600 text-xs">
                            {s?.aiSummary ?? "-"}
                          </td>
                        </tr>
                      );
                    })}

                    {category.hasTotal && categoryTotal && (
                      <tr className="bg-primary-lightest border-b-4 border-primary-light/50">
                        <td className="px-5 py-3 font-bold text-text-primary text-sm align-middle text-center border-r border-primary-light/30">
                          {category.name} 合計
                        </td>
                        <td className="px-4 py-3 text-center font-semibold text-slate-700 border-r border-primary-light/30">
                          {categoryTotal.prevPrevYear}
                        </td>
                        <td className="px-4 py-3 text-center font-semibold text-slate-700 border-r border-primary-light/30">
                          {categoryTotal.prevYear}
                        </td>
                        <td className="px-4 py-3 text-center font-bold text-text-primary border-r border-primary-light/30">
                          {categoryTotal.aiScore}
                        </td>
                        <td className="px-4 py-3 text-center font-bold text-text-primary border-r border-primary-light/30">
                          {categoryTotal.aiScoreThisYear}
                        </td>
                        <td className="px-4 py-3 text-center text-slate-400 border-r border-primary-light/30">
                          -
                        </td>
                        <td className="px-5 py-3 text-slate-400 text-xs">-</td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}

              {/* Grand Total */}
              <tr className="bg-gradient-to-r from-primary-dark to-primary text-white font-bold">
                <td className="px-5 py-5" colSpan={2}>
                  全体合計
                </td>
                <td className="px-4 py-5 text-center">
                  {grandTotals.prevPrevYear}
                </td>
                <td className="px-4 py-5 text-center">
                  {grandTotals.prevYear}
                </td>
                <td className="px-4 py-5 text-center">{grandTotals.aiScore}</td>
                <td className="px-4 py-5 text-center text-lg font-extrabold">
                  {grandTotals.aiScoreThisYear}
                </td>
                <td className="px-4 py-5 text-center">-</td>
                <td className="px-5 py-5">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Evaluator Card */}
      <div className="max-w-md mx-auto">
        <Card variant="bordered" padding="md">
          <h3 className="text-center font-bold text-text-primary mb-6 pb-3 border-b-2 border-primary-light/50">
            評価者
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-sm text-slate-500 font-medium">役職名</span>
              <span className="text-sm font-semibold text-slate-700">
                氏　名
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <span className="text-sm text-slate-600">学部長</span>
              <span className="text-base font-bold text-text-primary">
                佐藤 一郎
              </span>
            </div>
            <div className="text-center text-slate-400 text-sm pt-2">
              令和＿＿年＿＿月＿＿日
            </div>
          </div>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <button className="px-8 py-3 text-sm font-semibold text-slate-600 bg-white border-2 border-slate-300 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all shadow-sm">
          印刷
        </button>
        <button className="px-8 py-3 text-sm font-semibold text-white bg-gradient-to-r from-primary-dark to-primary rounded-xl hover:shadow-lg transition-all shadow-md">
          確定
        </button>
      </div>
    </div>
  );
}
