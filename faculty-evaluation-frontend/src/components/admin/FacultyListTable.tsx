"use client";

import React from "react";
import Link from "next/link";
import type { FacultyListItem } from "@/types/facultyList";
import { Badge } from "@/components/ui";

interface FacultyListTableProps {
  data: FacultyListItem[];
  title: string;
  showAiScore?: boolean;
}

function getStatusBadgeVariant(status: FacultyListItem["status"]) {
  switch (status) {
    case "承認済":
      return "success";
    case "提出済":
      return "primary";
    case "提出済":
      return "primary";
    case "未提出":
      return "danger";
    default:
      return "default";
  }
}

export function FacultyListTable({
  data,
  title,
  showAiScore = false,
}: FacultyListTableProps) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-text-primary">
          {title} ({data.length}人)
        </h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm border border-primary-light/30 rounded-lg hover:bg-background-subtle transition-colors">
            検索
          </button>
          <button className="px-4 py-2 text-sm border border-primary-light/30 rounded-lg hover:bg-background-subtle transition-colors">
            フィルター
          </button>
          <button className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
            Excelエクスポート
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-primary-light/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-background-subtle border-b border-primary-light/30">
                <th className="px-4 py-3 text-left font-semibold text-text-primary w-[100px]">
                  職員番号
                </th>
                <th className="px-4 py-3 text-left font-semibold text-text-primary w-[150px]">
                  氏名
                </th>
                <th className="px-4 py-3 text-left font-semibold text-text-primary">
                  学部・学科
                </th>
                <th className="px-4 py-3 text-left font-semibold text-text-primary w-[120px]">
                  職名
                </th>
                <th className="px-4 py-3 text-center font-semibold text-text-primary w-[100px]">
                  状態
                </th>
                <th className="px-4 py-3 text-center font-semibold text-text-primary w-[100px]">
                  進捗率
                </th>
                {showAiScore && (
                  <th className="px-4 py-3 text-center font-semibold text-text-primary w-[100px]">
                    AIスコア
                  </th>
                )}
                <th className="px-4 py-3 text-center font-semibold text-text-primary w-[120px]">
                  最終更新
                </th>
                <th className="px-4 py-3 text-center font-semibold text-text-primary w-[120px]">
                  アクション
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((faculty, index) => (
                <tr
                  key={faculty.id}
                  className="border-b border-primary-light/20 hover:bg-background-subtle transition-colors"
                >
                  <td className="px-4 py-3 text-text-secondary">
                    {faculty.employeeNumber}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/faculty/${faculty.id}`}
                      className="text-primary font-medium hover:underline"
                    >
                      {faculty.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    {faculty.department}
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    {faculty.position}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Badge variant={getStatusBadgeVariant(faculty.status)}>
                      {faculty.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-full bg-background-subtle rounded-full h-2 max-w-[80px]">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${faculty.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-text-muted">
                        {faculty.progress}%
                      </span>
                    </div>
                  </td>
                  {showAiScore && (
                    <td className="px-4 py-3 text-center font-semibold text-primary">
                      {faculty.aiScore ? `${faculty.aiScore}点` : "-"}
                    </td>
                  )}
                  <td className="px-4 py-3 text-center text-text-muted text-xs">
                    {faculty.lastUpdated}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`/admin/faculty/${faculty.id}`}
                        className="text-primary hover:underline text-xs"
                      >
                        詳細
                      </Link>
                      {faculty.status === "未提出" && (
                        <button className="text-warning hover:underline text-xs">
                          督促
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Actions */}
      {data.some((f) => f.status === "未提出") && (
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm bg-warning text-white rounded-lg hover:bg-warning-dark transition-colors">
            未提出者に督促メール送信
          </button>
        </div>
      )}
    </div>
  );
}
