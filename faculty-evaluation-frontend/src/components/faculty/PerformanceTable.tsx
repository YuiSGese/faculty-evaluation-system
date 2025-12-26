"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui";
import { Badge } from "@/components/ui";
import { PageHeader } from "@/components/ui/PageHeader";
import { SignatureSection } from "@/components/form/SignatureSection";
import { ActionButtons } from "@/components/form/ActionButtons";

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
  role?: "faculty" | "manager" | "admin";
  // Signature props (optional - use internal state if not provided)
  evaluatorPosition?: string;
  evaluatorName?: string;
  signatureDate?: { year: string; month: string; day: string };
  onSignatureChange?: (
    field: string,
    value: string | { year: string; month: string; day: string }
  ) => void;
  onSubmit?: () => void;
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
          <div className="text-xs text-text-muted font-medium">{f.label}</div>
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
  const colors = ["var(--primary-dark)", "var(--primary)"];
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
  role = "faculty",
  // Signature props with defaults
  evaluatorPosition: propEvaluatorPosition,
  evaluatorName: propEvaluatorName,
  signatureDate: propSignatureDate,
  onSignatureChange,
  onSubmit,
}: PerformanceTableProps) {
  // Internal state for signature (fallback if props not provided)
  const [internalSignature, setInternalSignature] = useState({
    evaluatorPosition: propEvaluatorPosition || "学部長",
    evaluatorName: propEvaluatorName || "佐藤 一郎",
    signatureDate: propSignatureDate || { year: "", month: "", day: "" },
  });

  // Use props if provided, otherwise use internal state
  const signatureData = {
    evaluatorPosition:
      propEvaluatorPosition ?? internalSignature.evaluatorPosition,
    evaluatorName: propEvaluatorName ?? internalSignature.evaluatorName,
    signatureDate: propSignatureDate ?? internalSignature.signatureDate,
  };

  // Handle signature change
  const handleSignatureChange = (
    field: string,
    value: string | { year: string; month: string; day: string }
  ) => {
    if (onSignatureChange) {
      // Use parent handler if provided (for API integration)
      onSignatureChange(field, value);
    } else {
      // Use internal state (for mock data)
      setInternalSignature((prev) => ({ ...prev, [field]: value }));
    }
  };

  // Handle submit
  const handleSubmit = () => {
    if (onSubmit) {
      // Use parent handler if provided
      onSubmit();
    } else {
      // Default action (for mock data)
      console.log("Submit performance data:", {
        facultyInfo,
        scores,
        signature: signatureData,
      });
      alert("Performance data submitted!");
    }
  };

  const allItems = config.categories.flatMap((c) => c.items);
  const grandTotals = {
    prevPrevYear: calcTotal(allItems, scores, "prevPrevYear"),
    prevYear: calcTotal(allItems, scores, "prevYear"),
    aiScore: calcTotal(allItems, scores, "aiScore"),
    aiScoreThisYear: calcTotal(allItems, scores, "aiScoreThisYear"),
  };
  const currentYear = new Date().getFullYear();

  return (
    <div className="space-y-6">
      <PageHeader title={config.titlePerformance} year={currentYear} />

      {/* Faculty Info */}
      <InfoSection info={facultyInfo} />

      {/* Main Table */}
      <Card variant="elevated" padding="none" allowStickyChildren={true}>
        <div className="">
          <table className="w-full text-sm">
            <thead className="sticky top-0 z-30 bg-gradient-to-r from-primary-dark to-primary text-white font-bold shadow-md">
              <tr>
                <th className="px-5 py-3 text-center font-semibold w-32 border-r border-white/50">
                  区分
                </th>
                <th className="px-5 py-3 text-center font-semibold w-44 border-r border-white/50">
                  評価項目
                </th>
                <th className="px-4 py-3 text-center font-semibold w-24 border-r border-white/50">
                  前々年度
                </th>
                <th className="px-4 py-3 text-center font-semibold w-24 border-r border-white/50">
                  前年度
                </th>
                <th className="px-4 py-3 text-center font-semibold w-28 border-r border-white/50">
                  AIスコア
                </th>
                <th className="px-4 py-3 text-center font-semibold w-32 border-r border-white/50">
                  今年度AIスコア
                </th>
                <th className="px-4 py-3 text-center font-semibold w-28 border-r border-white/50">
                  今年度評価
                </th>
                <th className="px-5 py-3 text-center font-semibold">
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
                          className={`border-b border-primary-light/20 hover:bg-primary-lightest/20 transition-colors ${
                            !category.hasTotal &&
                            idx === category.items.length - 1
                              ? "border-b-4 border-primary/30"
                              : ""
                          }`}
                        >
                          {isFirst && (
                            <td
                              rowSpan={itemCount}
                              className="px-5 py-3 font-bold text-text-primary text-base align-middle text-center border-r border-primary-light/30"
                            >
                              <span>{category.name}</span>
                            </td>
                          )}
                          <td className="px-5 py-3 text-text-secondary font-medium border-r border-primary-light/20">
                            {item.name}
                          </td>
                          <td className="px-4 py-3 text-center text-text-secondary border-r border-primary-light/20">
                            {s?.prevPrevYear ?? "-"}
                          </td>
                          <td className="px-4 py-3 text-center text-text-secondary border-r border-primary-light/20">
                            {s?.prevYear ?? "-"}
                          </td>
                          <td className="px-4 py-3 text-center text-text-primary font-semibold border-r border-primary-light/20">
                            {s?.aiScore ?? "-"}
                          </td>
                          <td className="px-4 py-3 text-center text-text-primary font-bold border-r border-primary-light/20">
                            {s?.aiScoreThisYear ?? "-"}
                          </td>
                          <td className="px-4 py-3 text-center border-r border-primary-light/20">
                            {getEvalBadge(s?.evaluation)}
                          </td>
                          <td className="px-5 py-3 text-text-muted text-sm">
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
                        <td className="px-4 py-3 text-center font-semibold text-text-secondary border-r border-primary-light/30">
                          {categoryTotal.prevPrevYear}
                        </td>
                        <td className="px-4 py-3 text-center font-semibold text-text-secondary border-r border-primary-light/30">
                          {categoryTotal.prevYear}
                        </td>
                        <td className="px-4 py-3 text-center font-bold text-text-primary border-r border-primary-light/30">
                          {categoryTotal.aiScore}
                        </td>
                        <td className="px-4 py-3 text-center font-bold text-text-primary border-r border-primary-light/30">
                          {categoryTotal.aiScoreThisYear}
                        </td>
                        <td className="px-4 py-3 text-center text-text-muted border-r border-primary-light/30">
                          -
                        </td>
                        <td className="px-5 py-3 text-text-muted text-xs">-</td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}

              {/* Grand Total */}
              <tr className="bg-gradient-to-r from-primary-dark to-primary text-white font-bold">
                <td className="px-5 py-3" colSpan={2}>
                  全体合計
                </td>
                <td className="px-4 py-3 text-center">
                  {grandTotals.prevPrevYear}
                </td>
                <td className="px-4 py-3 text-center">
                  {grandTotals.prevYear}
                </td>
                <td className="px-4 py-3 text-center">{grandTotals.aiScore}</td>
                <td className="px-4 py-3 text-center text-lg font-extrabold">
                  {grandTotals.aiScoreThisYear}
                </td>
                <td className="px-4 py-3 text-center">-</td>
                <td className="px-5 py-3">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Signature Section - Only show for Manager role */}
      {/* {role === "manager" && (
        
      )} */}
      <SignatureSection
        evaluatorPosition={signatureData.evaluatorPosition}
        evaluatorName={signatureData.evaluatorName}
        signatureDate={signatureData.signatureDate}
        onChange={handleSignatureChange}
        readonly={false}
      />
      {/* Action Buttons */}
      <ActionButtons
        onPrint={() => window.print()}
        onSubmit={handleSubmit}
        submitLabel={role === "faculty" ? "提出" : "確定"}
        showSave={false}
      />
    </div>
  );
}
