"use client";

import React from "react";
import { IconPlus, IconTrash, IconUpload } from "@tabler/icons-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export interface ResearchRowItem {
  id: string;
  date: string;
  summary: string;
  title?: string; // Used for "項目" column
}

interface ResearchCategoryTableProps {
  title: string;
  description?: string; // This will now be used as placeholder for Summary
  items: ResearchRowItem[];
  onAddRow: (count: number) => void;
  onRemoveRow: (index: number) => void;
  onRowChange: (
    index: number,
    field: keyof ResearchRowItem,
    value: string,
  ) => void;
  onImportCSV?: () => void;
  readOnly?: boolean;
}

export function ResearchCategoryTable({
  title,
  description,
  items,
  onAddRow,
  onRemoveRow,
  onRowChange,
  onImportCSV,
  readOnly = false,
}: ResearchCategoryTableProps) {
  return (
    <Card
      variant="elevated"
      padding="none"
      className="mb-6 rounded-none overflow-visible border-primary/20"
    >
      {/* --- Custom Header (Gradient Style) --- */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-primary-dark to-primary border-b border-primary-light/20 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
        {/* Left: Title (Description removed from here) */}
        <div className="flex-1">
          <h4 className="font-bold text-white text-sm flex items-center gap-2">
            {title}
          </h4>
        </div>

        {/* Right: Action Buttons */}
        {!readOnly && (
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAddRow(1)}
              className="h-7 text-xs bg-white/90 hover:bg-white text-primary-dark border-transparent gap-1 shadow-sm"
            >
              <IconPlus size={14} /> 1行追加
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAddRow(5)}
              className="h-7 text-xs bg-white/90 hover:bg-white text-primary-dark border-transparent gap-1 shadow-sm"
            >
              <IconPlus size={14} /> 5行追加
            </Button>

            {/* CSV Import Button */}
            {onImportCSV && (
              <>
                <div className="h-4 w-px bg-white/40 mx-1" />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onImportCSV}
                  className="h-7 text-xs bg-white/90 hover:bg-white text-primary-dark border-transparent gap-1 shadow-sm"
                >
                  <IconUpload size={14} /> CSV取込
                </Button>
              </>
            )}
          </div>
        )}
      </div>

      {/* --- Table Content --- */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-background-subtle text-text-secondary text-xs border-b border-primary-light/30">
            <tr>
              <th className="px-3 py-2 text-left font-medium w-[25%] border-r border-primary-light/20">
                項目
              </th>
              <th className="px-3 py-2 text-center font-medium w-[160px] border-r border-primary-light/20">
                年月日
              </th>
              <th className="px-3 py-2 text-left font-medium border-r border-primary-light/20">
                概要
              </th>
              {!readOnly && (
                <th className="px-2 py-2 w-[50px] text-center font-medium">
                  削除
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td
                  colSpan={readOnly ? 3 : 4}
                  className="px-4 py-8 text-center text-text-muted text-xs italic"
                >
                  データがありません。「行追加」ボタンから入力を開始してください。
                </td>
              </tr>
            ) : (
              items.map((item, idx) => (
                <tr
                  key={item.id}
                  className="group border-b border-primary-light/20 hover:bg-primary-lightest/10 transition-colors"
                >
                  {/* Item (Title) Column - Added */}
                  <td className="px-3 py-2 border-r border-primary-light/20 align-top">
                    <input
                      type="text"
                      className="w-full px-2 py-1.5 border border-primary-light/30 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                      placeholder="項目を入力"
                      value={item.title || ""}
                      onChange={(e) =>
                        onRowChange(idx, "title", e.target.value)
                      }
                      disabled={readOnly}
                    />
                  </td>

                  {/* Date Column */}
                  <td className="px-3 py-2 border-r border-primary-light/20 align-top">
                    <input
                      type="date"
                      className="w-full px-2 py-1.5 border border-primary-light/30 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                      value={item.date}
                      onChange={(e) => onRowChange(idx, "date", e.target.value)}
                      disabled={readOnly}
                    />
                  </td>

                  {/* Summary Column - Use description as placeholder */}
                  <td className="px-3 py-2 border-r border-primary-light/20 align-top">
                    <textarea
                      rows={4} // <--- [1] Tăng số này lên (ví dụ: 4) để ô cao hơn mặc định
                      className="w-full px-2 py-1.5 border border-primary-light/30 rounded text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary bg-white min-h-[100px]" // <--- [2] Tăng min-h-[50px] lên min-h-[100px] nếu muốn
                      placeholder={description || "概要を入力"}
                      value={item.summary}
                      onChange={(e) =>
                        onRowChange(idx, "summary", e.target.value)
                      }
                      disabled={readOnly}
                    />
                  </td>

                  {/* Delete Action */}
                  {!readOnly && (
                    <td className="px-2 py-2 text-center align-middle">
                      <button
                        onClick={() => onRemoveRow(idx)}
                        className="text-gray-300 hover:text-red-500 transition-colors p-1 rounded hover:bg-red-50"
                        title="行を削除"
                      >
                        <IconTrash size={16} />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
