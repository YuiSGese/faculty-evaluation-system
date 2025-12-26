"use client";

import React, { useState } from "react";
import { Card, Badge } from "@/components/ui";
import { PageHeader } from "@/components/ui/PageHeader";
import { SignatureSection } from "@/components/form/SignatureSection";
import { ActionButtons } from "@/components/form/ActionButtons";
import { PERSONAL_EVALUATION_CONFIG } from "@/config/personal.config";
import type { PersonalEvaluationData } from "@/types/personal";

export interface PersonalEvaluationTableProps {
  data: PersonalEvaluationData;
  role?: "faculty" | "manager" | "admin";
}

// Info + Score Definition Section (1/3 + 2/3)
function InfoAndScoreSection({ data }: { data: PersonalEvaluationData }) {
  const config = PERSONAL_EVALUATION_CONFIG;

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

      {/* Right: Score Definition Table - 2/3 */}
      <div className="lg:col-span-2">
        <table className="w-full h-full text-xs border border-primary-light/30">
          <thead>
            <tr className="bg-background-subtle">
              <th className="px-4 py-3 border border-primary-light/30 font-semibold text-text-primary text-center">
                評点
              </th>
              {config.scoreDefinitions.map((def) => (
                <th
                  key={def.score}
                  className="px-4 py-3 border border-primary-light/30 font-semibold text-text-primary text-center"
                >
                  {def.score}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-3 border border-primary-light/30 bg-background-subtle font-semibold text-text-primary">
                定義
              </td>
              {config.scoreDefinitions.map((def) => (
                <td
                  key={def.score}
                  className="px-4 py-3 border border-primary-light/30 text-center text-text-secondary"
                >
                  {def.definition}
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-4 py-3 border border-primary-light/30 bg-background-subtle font-semibold text-text-primary">
                定量基準（%）
              </td>
              {config.scoreDefinitions.map((def) => (
                <td
                  key={def.score}
                  className="px-4 py-3 border border-primary-light/30 text-center text-text-secondary"
                >
                  {def.quantitative}
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-4 py-3 border border-primary-light/30 bg-background-subtle font-semibold text-text-primary">
                定性基準
              </td>
              {config.scoreDefinitions.map((def) => (
                <td
                  key={def.score}
                  className="px-4 py-3 border border-primary-light/30 text-center text-text-secondary whitespace-pre-line"
                >
                  {def.qualitative}
                </td>
              ))}
            </tr>
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

export function PersonalEvaluationTable({
  data,
  role = "faculty",
}: PersonalEvaluationTableProps) {
  const config = PERSONAL_EVALUATION_CONFIG;

  // State for goals
  const [goals, setGoals] = useState(data.goals);

  // State for reflection comment
  const [reflectionComment, setReflectionComment] = useState(
    data.reflectionComment
  );

  // Signature state
  const [signature, setSignature] = useState({
    evaluatorPosition: data.evaluatorPosition || "学部長",
    evaluatorName: data.evaluatorName || "佐藤 一郎",
    signatureDate: data.signatureDate || { year: "", month: "", day: "" },
  });

  // Handle goal field changes
  const handleGoalChange = (
    goalIndex: number,
    field: keyof (typeof goals)[0],
    value: string
  ) => {
    setGoals((prev) => {
      const newGoals = [...prev];
      newGoals[goalIndex] = {
        ...newGoals[goalIndex],
        [field]: value,
      };
      return newGoals;
    });
  };

  const handleSignatureChange = (
    field: string,
    value: string | { year: string; month: string; day: string }
  ) => {
    setSignature((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Submit personal evaluation:", {
      goals,
      reflectionComment,
      signature,
    });
    alert("個人目標評価を提出しました！");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader title={config.title} year={data.year} />

      {/* Info + Score Definition */}
      <InfoAndScoreSection data={data} />

      {/* Main Evaluation Table */}
      <Card variant="elevated" padding="none" className="mt-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-primary-dark to-primary text-white shadow-md">
              <tr>
                <th className="px-3 py-3 text-center font-semibold w-[100px] border-r border-white/50">
                  区分①
                </th>
                <th className="px-3 py-3 text-center font-semibold w-[100px] border-r border-white/50">
                  選択
                </th>
                <th className="px-3 py-3 text-left font-semibold border-r border-white/50">
                  上位方針（所属学部の重点改革と重点改革項目）
                </th>
                <th className="px-3 py-3 text-left font-semibold border-r border-white/50">
                  個人目標値（達成基準）
                </th>
                <th className="px-3 py-3 text-left font-semibold w-[180px] border-r border-white/50">
                  個人目標進捗度（期中）
                </th>
                <th className="px-3 py-3 text-left font-semibold w-[180px] border-r border-white/50">
                  個人目標進捗度（期末）
                </th>
                <th className="px-3 py-3 text-center font-semibold w-[120px]">
                  区分②
                </th>
              </tr>
            </thead>
            <tbody>
              {goals.map((goal, idx) => (
                <tr
                  key={goal.id}
                  className="hover:bg-background-subtle transition-colors border-b border-primary-light/30"
                >
                  {/* 区分① - Dropdown */}
                  <td className="px-3 py-3 text-center border-r border-primary-light/30">
                    <select
                      className="w-full px-2 py-1 border border-primary-light/30 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      value={goal.category1}
                      onChange={(e) =>
                        handleGoalChange(idx, "category1", e.target.value)
                      }
                      disabled={role !== "faculty"}
                    >
                      <option value="">-</option>
                      <option value="教育">教育</option>
                      <option value="研究">研究</option>
                      <option value="社会貢献">社会貢献</option>
                    </select>
                  </td>

                  {/* 選択 - Input */}
                  <td className="px-3 py-3 border-r border-primary-light/30">
                    <input
                      type="text"
                      className="w-full px-2 py-1 border border-primary-light/30 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      value={goal.selection}
                      onChange={(e) =>
                        handleGoalChange(idx, "selection", e.target.value)
                      }
                      disabled={role !== "faculty"}
                    />
                  </td>

                  {/* 上位方針 - Textarea */}
                  <td className="px-3 py-3 border-r border-primary-light/30">
                    <textarea
                      rows={3}
                      className="w-full px-2 py-1 border border-primary-light/30 rounded text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary"
                      style={{ height: "50px", maxHeight: "200px" }}
                      value={goal.upperPolicy}
                      onChange={(e) =>
                        handleGoalChange(idx, "upperPolicy", e.target.value)
                      }
                      disabled={role !== "faculty"}
                    />
                  </td>

                  {/* 個人目標値 - Textarea */}
                  <td className="px-3 py-3 border-r border-primary-light/30">
                    <textarea
                      rows={3}
                      className="w-full px-2 py-1 border border-primary-light/30 rounded text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary"
                      style={{ height: "50px", maxHeight: "200px" }}
                      value={goal.personalGoal}
                      onChange={(e) =>
                        handleGoalChange(idx, "personalGoal", e.target.value)
                      }
                      disabled={role !== "faculty"}
                    />
                  </td>

                  {/* 個人目標進捗度（期中） - Textarea */}
                  <td className="px-3 py-3 border-r border-primary-light/30">
                    <textarea
                      rows={3}
                      className="w-full px-2 py-1 border border-primary-light/30 rounded text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary"
                      style={{ height: "50px", maxHeight: "200px" }}
                      value={goal.progressMid}
                      onChange={(e) =>
                        handleGoalChange(idx, "progressMid", e.target.value)
                      }
                      disabled={role !== "faculty"}
                    />
                  </td>

                  {/* 個人目標進捗度（期末） - Textarea */}
                  <td className="px-3 py-3 border-r border-primary-light/30">
                    <textarea
                      rows={3}
                      className="w-full px-2 py-1 border border-primary-light/30 rounded text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary"
                      style={{ height: "50px", maxHeight: "200px" }}
                      value={goal.progressEnd}
                      onChange={(e) =>
                        handleGoalChange(idx, "progressEnd", e.target.value)
                      }
                      disabled={role !== "faculty"}
                    />
                  </td>

                  {/* 区分② - Dropdown */}
                  <td className="px-3 py-3 text-center">
                    <select
                      className="w-full px-2 py-1 border border-primary-light/30 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      value={goal.category2}
                      onChange={(e) =>
                        handleGoalChange(idx, "category2", e.target.value)
                      }
                      disabled={role !== "faculty"}
                    >
                      <option value="">-</option>
                      <option value="チャレンジ">チャレンジ</option>
                      <option value="通常">通常</option>
                      <option value="継続">継続</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* AI Evaluation Table */}
      <Card variant="elevated" padding="none">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-primary-dark to-primary text-white shadow-md">
              <tr>
                <th className="px-3 py-3 text-center font-semibold w-[80px] border-r border-white/50">
                  個別評点
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
              {goals.map((goal) => (
                <tr key={goal.id} className="border-b border-primary-light/30">
                  {/* 個別評点 */}
                  <td className="px-3 py-3 text-center border-r border-primary-light/30">
                    <input
                      type="number"
                      min="1"
                      max="4"
                      className="w-16 px-2 py-1 border border-primary-light/30 rounded text-center text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      value={goal.individualScore || ""}
                      onChange={(e) =>
                        handleGoalChange(
                          goals.indexOf(goal),
                          "individualScore",
                          e.target.value
                        )
                      }
                      disabled={role !== "manager"}
                    />
                  </td>

                  {/* AIスコア - Readonly */}
                  <td className="px-3 py-3 text-center text-primary font-semibold border-r border-primary-light/30">
                    {goal.aiScore}
                  </td>

                  {/* AI評価 - Badge */}
                  <td className="px-3 py-3 text-center border-r border-primary-light/30">
                    <Badge variant={getScoreBadgeVariant(goal.aiEvaluation)}>
                      {goal.aiEvaluation}
                    </Badge>
                  </td>

                  {/* 評価 - Badge or Input */}
                  <td className="px-3 py-3 text-center border-r border-primary-light/30">
                    {goal.evaluation ? (
                      <Badge variant={getScoreBadgeVariant(goal.evaluation)}>
                        {goal.evaluation}
                      </Badge>
                    ) : (
                      <span className="text-text-muted">-</span>
                    )}
                  </td>

                  {/* AI評価概要 - Readonly */}
                  <td className="px-3 py-3 text-text-muted text-xs">
                    {goal.aiSummary}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Comment Box */}
      <div className="border border-primary-light/30 rounded-lg p-4 bg-white">
        <h3 className="font-semibold text-text-primary mb-2 text-sm">
          評価対象者1年間の振り返りコメント
        </h3>
        <textarea
          rows={6}
          maxLength={250}
          className="w-full px-4 py-3 border border-primary-light/30 rounded text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary"
          style={{ minHeight: "150px", maxHeight: "400px" }}
          placeholder="年間の振り返りコメントを入力してください（最大250文字）"
          value={reflectionComment}
          onChange={(e) => setReflectionComment(e.target.value)}
          disabled={role !== "faculty"}
        />
        <p className="text-xs text-text-muted mt-1 text-right">
          {reflectionComment.length}/250
        </p>
      </div>

      {/* Instructions */}
      <div className="border border-primary-dark bg-background-subtle p-4 rounded">
        <h3 className="font-semibold text-text-primary mb-3 text-sm">
          内容の記入方法について
        </h3>
        <div className="space-y-2 text-sm text-text-secondary">
          {config.instructionSteps.map((step, idx) => (
            <p key={idx}>
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-primary-light/30 text-xs mr-2">
                {idx + 1}
              </span>
              {step}
            </p>
          ))}
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
