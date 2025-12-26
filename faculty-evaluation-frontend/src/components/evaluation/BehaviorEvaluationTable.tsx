"use client";

import React, { useState } from "react";
import { Card, Badge } from "@/components/ui";
import { PageHeader } from "@/components/ui/PageHeader";
import { SignatureSection } from "@/components/form/SignatureSection";
import { ActionButtons } from "@/components/form/ActionButtons";
import { BEHAVIOR_EVALUATION_CONFIG } from "@/config/behavior.config";
import type { BehaviorEvaluationData } from "@/types/behavior";

export interface BehaviorEvaluationTableProps {
  data: BehaviorEvaluationData;
  role?: "faculty" | "manager" | "admin";
}

// Info + Rating Scale Section (1/3 + 2/3)
function InfoAndRatingSection({ data }: { data: BehaviorEvaluationData }) {
  const config = BEHAVIOR_EVALUATION_CONFIG;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left: Personal Info Table - 1/3 */}
      <div className="lg:col-span-1">
        <table className="w-full h-full text-xs border border-primary-light/30">
          <tbody>
            <tr className="border-b border-primary-light/30">
              <td className="px-4 py-3 bg-background-subtle font-semibold text-text-primary w-[45%]">
                評価対象者 氏名
              </td>
              <td className="px-4 py-3 text-text-primary">
                {data.facultyInfo.name}
              </td>
            </tr>
            <tr className="border-b border-primary-light/30">
              <td className="px-4 py-3 bg-background-subtle font-semibold text-text-primary">
                学部・学科・領域
              </td>
              <td className="px-4 py-3 text-text-secondary">
                {data.facultyInfo.department}
              </td>
            </tr>
            <tr className="border-b border-primary-light/30">
              <td className="px-4 py-3 bg-background-subtle font-semibold text-text-primary">
                職員番号
              </td>
              <td className="px-4 py-3 text-text-secondary">
                {data.facultyInfo.employeeNumber}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 bg-background-subtle font-semibold text-text-primary">
                職名
              </td>
              <td className="px-4 py-3 text-text-secondary">
                {data.facultyInfo.position}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Right: Rating Scale Table - 2/3 */}
      <div className="lg:col-span-2">
        <table className="w-full h-full text-xs border border-primary-light/30">
          <thead>
            <tr className="bg-background-subtle">
              <th className="px-4 py-3 border border-primary-light/30 font-semibold text-text-primary text-center">
                評価項目
              </th>
              {config.ratingLabels.map((label) => (
                <th
                  key={label}
                  className="px-4 py-3 border border-primary-light/30 font-semibold text-text-primary text-center"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {config.ratingScales.map((scale) => (
              <tr key={scale.category}>
                <td className="px-4 py-3 border border-primary-light/30 bg-background-subtle font-semibold text-text-primary">
                  {scale.category}
                </td>
                {scale.ratings.map((rating, idx) => (
                  <td
                    key={idx}
                    className="px-4 py-3 border border-primary-light/30 text-center text-text-secondary whitespace-pre-line"
                  >
                    {rating}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function getScoreBadgeVariant(score: number): "S" | "A" | "B" | "C" {
  if (score >= 4) return "S";
  if (score >= 3) return "A";
  if (score >= 2) return "B";
  return "C";
}

export function BehaviorEvaluationTable({
  data,
  role = "faculty",
}: BehaviorEvaluationTableProps) {
  const config = BEHAVIOR_EVALUATION_CONFIG;

  // State for items
  const [items, setItems] = useState(data.items);

  // Signature state
  const [signature, setSignature] = useState({
    evaluatorPosition: data.evaluatorPosition || "学部長",
    evaluatorName: data.evaluatorName || "佐藤 一郎",
    signatureDate: data.signatureDate || { year: "", month: "", day: "" },
  });

  // Handle item changes
  const handleItemChange = (
    itemIndex: number,
    field: "selfScore" | "evaluation",
    value: string
  ) => {
    setItems((prev) => {
      const newItems = [...prev];
      newItems[itemIndex] = {
        ...newItems[itemIndex],
        [field]: parseInt(value) || 0,
      };
      return newItems;
    });
  };

  // Calculate totals
  const totalSelfScore = items.reduce(
    (sum, item) => sum + (item.selfScore || 0),
    0
  );
  const totalAiScore = items.reduce(
    (sum, item) => sum + (item.aiScore || 0),
    0
  );
  const totalEvaluation = items.reduce(
    (sum, item) => sum + (item.evaluation || 0),
    0
  );

  const handleSignatureChange = (
    field: string,
    value: string | { year: string; month: string; day: string }
  ) => {
    setSignature((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Submit behavior evaluation:", { items, signature });
    alert("教育者行動評価を提出しました！");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader title={config.title} year={data.year} />

      {/* Info + Rating Scale */}
      <InfoAndRatingSection data={data} />

      {/* Main Evaluation Table */}
      <Card variant="elevated" padding="none" allowStickyChildren={true}>
        <div className="">
          <table className="w-full text-sm">
            <thead className="sticky top-0 z-30 bg-gradient-to-r from-primary-dark to-primary text-white font-bold shadow-md">
              <tr>
                <th className="px-3 py-3 text-left font-semibold border-r border-white/50">
                  評価項目
                </th>
                <th className="px-3 py-3 text-center font-semibold w-[100px] border-r border-white/50">
                  自己評価
                </th>
                <th className="px-3 py-3 text-center font-semibold w-[100px] border-r border-white/50">
                  AIスコア
                </th>
                <th className="px-3 py-3 text-center font-semibold w-[100px] border-r border-white/50">
                  AI評価
                </th>
                <th className="px-3 py-3 text-center font-semibold w-[100px] border-r border-white/50">
                  評価
                </th>
                <th className="px-3 py-3 text-left font-semibold">
                  AI評価概要
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-background-subtle transition-colors border-b border-primary-light/30"
                >
                  {/* 評価項目 */}
                  <td className="px-3 py-3 text-text-secondary border-r border-primary-light/30">
                    {item.text}
                  </td>

                  {/* 自己評価 - Dropdown */}
                  <td className="px-3 py-3 text-center border-r border-primary-light/30">
                    <select
                      className="w-full px-2 py-1 border border-primary-light/30 rounded text-center text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      value={item.selfScore || ""}
                      onChange={(e) =>
                        handleItemChange(index, "selfScore", e.target.value)
                      }
                      disabled={role !== "faculty"}
                    >
                      <option value="">-</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </td>

                  {/* AIスコア - Readonly */}
                  <td className="px-3 py-3 text-center text-primary font-semibold border-r border-primary-light/30">
                    {item.aiScore}
                  </td>

                  {/* AI評価 - Badge */}
                  <td className="px-3 py-3 text-center border-r border-primary-light/30">
                    <Badge variant={getScoreBadgeVariant(item.aiEvaluation)}>
                      {item.aiEvaluation}
                    </Badge>
                  </td>

                  {/* 評価 - Dropdown (Always editable, no role check) */}
                  <td className="px-3 py-3 text-center border-r border-primary-light/30">
                    <select
                      className="w-full px-2 py-1 border border-primary-light/30 rounded text-center text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      value={item.evaluation || ""}
                      onChange={(e) =>
                        handleItemChange(index, "evaluation", e.target.value)
                      }
                    >
                      <option value="">-</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </td>

                  {/* AI評価概要 - Readonly */}
                  <td className="px-3 py-3 text-text-muted text-xs">
                    {item.aiSummary}
                  </td>
                </tr>
              ))}

              {/* Total Row */}
              <tr className="bg-primary-lightest border-t-2 border-primary-light/50">
                <td className="px-3 py-3 font-bold text-text-primary border-r border-primary-light/30">
                  合計
                </td>
                <td className="px-3 py-3 text-center font-bold text-text-primary border-r border-primary-light/30">
                  {totalSelfScore}
                </td>
                <td className="px-3 py-3 text-center font-bold text-text-primary border-r border-primary-light/30">
                  {totalAiScore}
                </td>
                <td className="px-3 py-3 text-center text-text-muted border-r border-primary-light/30">
                  -
                </td>
                <td className="px-3 py-3 text-center font-bold text-text-primary border-r border-primary-light/30">
                  {totalEvaluation}
                </td>
                <td className="px-3 py-3 text-text-muted">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Instructions */}
      <div className="border border-primary-dark bg-background-subtle p-4 rounded">
        <h3 className="font-semibold text-text-primary mb-3 text-sm">
          記入方法について
        </h3>
        <div className="space-y-2 text-sm text-text-secondary">
          <p>各評価項目について、1～4の4段階で自己評価を行ってください。</p>
          <p>評価基準については、上記の表を参照してください。</p>
        </div>
      </div>

      {/* Signature Section */}
      <SignatureSection
        evaluatorPosition={signature.evaluatorPosition}
        evaluatorName={signature.evaluatorName}
        signatureDate={signature.signatureDate}
        onChange={handleSignatureChange}
        readonly={role !== "manager"}
      />

      {/* Action Buttons */}
      <ActionButtons
        onPrint={() => window.print()}
        onSubmit={handleSubmit}
        submitLabel={role === "faculty" ? "提出" : "承認"}
        showSave={false}
      />
    </div>
  );
}
