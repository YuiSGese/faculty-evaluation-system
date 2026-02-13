"use client";

import React, { useState, useRef } from "react";
import {
  IconPlus,
  IconTrash,
  IconChevronUp,
  IconChevronDown,
  IconUpload,
} from "@tabler/icons-react";
import { Card, Button } from "@/components/ui";
import { PageHeader } from "@/components/ui/PageHeader";
import { ActionButtons } from "@/components/form/ActionButtons";
import { RESEARCH_RECORD_CONFIG } from "@/config/research.config";
import {
  ResearchCategoryTable,
  ResearchRowItem,
} from "./ResearchCategoryTable";
import type { ResearchRecordData } from "@/types/research";

export interface ResearchRecordTableProps {
  data: ResearchRecordData;
  role?: "faculty" | "manager" | "admin";
}

// --- Helper: Info Section (Button Removed) ---
function InfoSection({ data }: { data: ResearchRecordData }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="col-span-1 space-y-1">
        <div className="text-xs text-text-muted font-medium">氏名</div>
        <div className="text-sm font-semibold text-text-primary bg-primary-lightest/50 px-3 py-2 rounded-lg border border-primary-light/30">
          {data.facultyInfo.name}
        </div>
      </div>
      <div className="space-y-1">
        <div className="text-xs text-text-muted font-medium">学部・学科</div>
        <div className="text-sm font-semibold text-text-primary bg-primary-lightest/50 px-3 py-2 rounded-lg border border-primary-light/30">
          {data.facultyInfo.department}
        </div>
      </div>
      <div className="space-y-1">
        <div className="text-xs text-text-muted font-medium">職員番号</div>
        <div className="text-sm font-semibold text-text-primary bg-primary-lightest/50 px-3 py-2 rounded-lg border border-primary-light/30">
          {data.facultyInfo.employeeNumber}
        </div>
      </div>
      <div className="space-y-1">
        <div className="text-xs text-text-muted font-medium">職名</div>
        <div className="text-sm font-semibold text-text-primary bg-primary-lightest/50 px-3 py-2 rounded-lg border border-primary-light/30">
          {data.facultyInfo.position}
        </div>
      </div>
    </div>
  );
}

// --- Main Component ---
export function ResearchRecordTable({
  data,
  role = "faculty",
}: ResearchRecordTableProps) {
  const config = RESEARCH_RECORD_CONFIG;
  const csvInputRef = useRef<HTMLInputElement>(null);
  const [showInstructions, setShowInstructions] = useState(false);

  // --- STATE MANAGEMENT ---

  // 1. Education Records State
  const [educationState, setEducationState] = useState(() =>
    data.educationRecords.map((rec) => {
      // Logic: Ensure at least 1 empty row if items are empty
      const items =
        rec.items.length > 0
          ? rec.items.map((item) => ({
              ...item,
              id: Math.random().toString(36).substr(2, 9),
            }))
          : [
              {
                id: Math.random().toString(36).substr(2, 9),
                date: "",
                summary: "",
                title: "",
              },
            ];

      return { ...rec, items };
    }),
  );

  // 2. Job Records State
  const [jobState, setJobState] = useState(() => {
    return config.jobItems.map((cfg, idx) => {
      const existingData = data.jobRecords[idx];
      const initialItems: ResearchRowItem[] = [];

      if (existingData && (existingData.summary || existingData.date)) {
        initialItems.push({
          id: Math.random().toString(36).substr(2, 9),
          date: existingData.date || "",
          summary: existingData.summary || "",
          title: "", // Initialize title for existing data
        });
      }

      // Ensure at least 1 empty row if empty
      if (initialItems.length === 0) {
        initialItems.push({
          id: Math.random().toString(36).substr(2, 9),
          date: "",
          summary: "",
          title: "", // Initialize title
        });
      }

      return {
        category: cfg.category,
        description: cfg.description, // Will be passed as placeholder
        items: initialItems,
      };
    });
  });

  // 3. Publications State
  const [publications, setPublications] = useState(() => {
    const pubs = data.publications.map((pub) => ({
      ...pub,
      id: Math.random().toString(36).substr(2, 9),
    }));
    if (pubs.length === 0) {
      pubs.push({
        id: Math.random().toString(36).substr(2, 9),
        title: "",
        authorshipType: "",
        publicationDate: "",
        publisher: "",
        summary: "",
      });
    }
    return pubs;
  });

  // --- HANDLERS ---

  const handleImportCSVClick = () => csvInputRef.current?.click();
  const handleCSVFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      alert(`CSV「${file.name}」を取り込みました（デモ）。`);
      if (csvInputRef.current) csvInputRef.current.value = "";
    }
  };

  // Section 1: Education Handlers
  const handleEducationAddRow = (catIndex: number, count: number) => {
    setEducationState((prev) => {
      return prev.map((cat, idx) => {
        if (idx !== catIndex) return cat;
        const newItems = Array(count)
          .fill(null)
          .map(() => ({
            id: Math.random().toString(36).substr(2, 9),
            date: "",
            summary: "",
            title: "",
          }));
        return { ...cat, items: [...cat.items, ...newItems] };
      });
    });
  };

  const handleEducationRemoveRow = (catIndex: number, itemIndex: number) => {
    setEducationState((prev) => {
      return prev.map((cat, idx) => {
        if (idx !== catIndex) return cat;
        return { ...cat, items: cat.items.filter((_, i) => i !== itemIndex) };
      });
    });
  };

  const handleEducationChange = (
    catIndex: number,
    itemIndex: number,
    field: keyof ResearchRowItem,
    value: string,
  ) => {
    setEducationState((prev) => {
      return prev.map((cat, idx) => {
        if (idx !== catIndex) return cat;
        const newItems = [...cat.items];
        newItems[itemIndex] = { ...newItems[itemIndex], [field]: value };
        return { ...cat, items: newItems };
      });
    });
  };

  // Section 2: Job Handlers
  const handleJobAddRow = (catIndex: number, count: number) => {
    setJobState((prev) => {
      return prev.map((cat, idx) => {
        if (idx !== catIndex) return cat;
        const newItems = Array(count)
          .fill(null)
          .map(() => ({
            id: Math.random().toString(36).substr(2, 9),
            date: "",
            summary: "",
            title: "", // Ensure new rows have title
          }));
        return { ...cat, items: [...cat.items, ...newItems] };
      });
    });
  };

  const handleJobRemoveRow = (catIndex: number, itemIndex: number) => {
    setJobState((prev) => {
      return prev.map((cat, idx) => {
        if (idx !== catIndex) return cat;
        return { ...cat, items: cat.items.filter((_, i) => i !== itemIndex) };
      });
    });
  };

  const handleJobChange = (
    catIndex: number,
    itemIndex: number,
    field: keyof ResearchRowItem,
    value: string,
  ) => {
    setJobState((prev) => {
      return prev.map((cat, idx) => {
        if (idx !== catIndex) return cat;
        const newItems = [...cat.items];
        newItems[itemIndex] = { ...newItems[itemIndex], [field]: value };
        return { ...cat, items: newItems };
      });
    });
  };

  // Section 3: Publication Handlers
  const handlePubAddRow = (count: number) => {
    setPublications((prev) => {
      const newItems = Array(count)
        .fill(null)
        .map(() => ({
          id: Math.random().toString(36).substr(2, 9),
          title: "",
          authorshipType: "",
          publicationDate: "",
          publisher: "",
          summary: "",
        }));
      return [...prev, ...newItems];
    });
  };

  const handlePubRemoveRow = (index: number) => {
    setPublications((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePubChange = (index: number, field: string, value: string) => {
    setPublications((prev) => {
      const newState = [...prev];
      newState[index] = { ...newState[index], [field]: value };
      return newState;
    });
  };

  const handleSubmit = () => {
    console.log("Submit:", { educationState, jobState, publications });
    alert("教育研究業績書を保存しました！");
  };

  return (
    <div className="space-y-8">
      <PageHeader title={config.title} year={data.year} />

      <input
        type="file"
        ref={csvInputRef}
        className="hidden"
        accept=".csv"
        onChange={handleCSVFileChange}
      />

      {/* <div className="border border-primary-light/30 rounded-lg overflow-hidden bg-white shadow-sm mb-6">
        <button
          onClick={() => setShowInstructions(!showInstructions)}
          className="w-full flex items-center justify-between p-4 bg-background-subtle hover:bg-primary-light/10 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="font-semibold text-text-primary text-sm">
              内容の記入方法について
            </span>
          </div>
          {showInstructions ? (
            <IconChevronUp size={20} className="text-text-secondary" />
          ) : (
            <IconChevronDown size={20} className="text-text-secondary" />
          )}
        </button>
        {showInstructions && (
          <div className="p-4 border-t border-primary-light/30 bg-white">
            <div className="space-y-2 text-sm text-text-secondary">
              <p>各項目について、年月日と概要を入力してください。</p>
              <p>行が足りない場合は「追加」ボタンを押してください。</p>
            </div>
          </div>
        )}
      </div> */}

      <InfoSection data={data} />

      {/* --- Section 1: 教育上の能力 --- */}
      <div className="space-y-2">
        <h3 className="font-bold text-lg text-primary-dark border-l-4 border-primary pl-3 mb-4">
          1. 教育上の能力に関する事項
        </h3>
        {educationState.map((cat, idx) => (
          <ResearchCategoryTable
            key={idx}
            title={cat.category}
            items={cat.items}
            // For Section 1, we don't have a long description in config, just placeholder.
            // We can pass the placeholder from config if needed, or leave description empty.
            // Assuming default summary placeholder is fine or we want specific one.
            description={config.educationItems[idx]?.placeholder}
            onAddRow={(count) => handleEducationAddRow(idx, count)}
            onRemoveRow={(rowIdx) => handleEducationRemoveRow(idx, rowIdx)}
            onRowChange={(rowIdx, field, val) =>
              handleEducationChange(idx, rowIdx, field, val)
            }
            onImportCSV={handleImportCSVClick}
            readOnly={role !== "faculty"}
          />
        ))}
      </div>

      {/* --- Section 2: 職務上の実績 --- */}
      <div className="space-y-2 mt-10">
        <h3 className="font-bold text-lg text-primary-dark border-l-4 border-primary pl-3 mb-4">
          2. 職務上の実績に関する事項
        </h3>
        {jobState.map((cat, idx) => (
          <ResearchCategoryTable
            key={idx}
            title={cat.category}
            description={cat.description} // Pass description to be used as placeholder
            items={cat.items}
            onAddRow={(count) => handleJobAddRow(idx, count)}
            onRemoveRow={(rowIdx) => handleJobRemoveRow(idx, rowIdx)}
            onRowChange={(rowIdx, field, val) =>
              handleJobChange(idx, rowIdx, field, val)
            }
            onImportCSV={handleImportCSVClick}
            readOnly={role !== "faculty"}
          />
        ))}
      </div>

      {/* --- Section 3: 著書・学術論文等 --- */}
      <div className="space-y-2 mt-10">
        <h3 className="font-bold text-lg text-primary-dark border-l-4 border-primary pl-3 mb-4">
          3. 著書、学術論文等
        </h3>
        <Card
          variant="elevated"
          padding="none"
          className="rounded-none overflow-visible border-primary/20"
        >
          <div className="sticky top-0 z-10 bg-gradient-to-r from-primary-dark to-primary border-b border-primary-light/20 p-3 flex items-center justify-between shadow-md">
            <h4 className="font-bold text-white text-sm">著書・論文リスト</h4>
            {role === "faculty" && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePubAddRow(1)}
                  className="h-7 text-xs bg-white/90 hover:bg-white text-primary-dark border-transparent gap-1"
                >
                  <IconPlus size={14} /> 1行追加
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePubAddRow(5)}
                  className="h-7 text-xs bg-white/90 hover:bg-white text-primary-dark border-transparent gap-1"
                >
                  <IconPlus size={14} /> 5行追加
                </Button>
                <div className="h-4 w-px bg-white/40 mx-1" />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleImportCSVClick}
                  className="h-7 text-xs bg-white/90 hover:bg-white text-primary-dark border-transparent gap-1"
                >
                  <IconUpload size={14} /> ファイル取込
                </Button>
              </div>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-background-subtle">
                <tr>
                  <th className="px-3 py-2 text-center font-medium border-r border-primary-light/20 w-[25%]">
                    著書名、学術論文等の名称
                  </th>
                  <th className="px-3 py-2 text-center font-medium border-r border-primary-light/20 w-[10%]">
                    単著、共著の別
                  </th>
                  <th className="px-3 py-2 text-center font-medium border-r border-primary-light/20 w-[130px]">
                    発行年月
                  </th>
                  <th className="px-3 py-2 text-center font-medium border-r border-primary-light/20 w-[20%]">
                    発行所、発表雑誌等の名称
                  </th>
                  <th className="px-3 py-2 text-center font-medium border-r border-primary-light/20">
                    概要
                  </th>
                  {role === "faculty" && (
                    <th className="px-2 py-2 w-[50px] text-center font-medium">
                      削除
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {publications.map((pub, idx) => (
                  <tr
                    key={pub.id || idx}
                    className="border-b border-primary-light/20 hover:bg-primary-lightest/10 transition-colors"
                  >
                    <td className="px-3 py-2 border-r border-primary-light/20">
                      <input
                        type="text"
                        className="w-full px-2 py-1.5 border border-primary-light/30 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        value={pub.title}
                        onChange={(e) =>
                          handlePubChange(idx, "title", e.target.value)
                        }
                        disabled={role !== "faculty"}
                      />
                    </td>
                    <td className="px-3 py-2 border-r border-primary-light/20">
                      <select
                        className="w-full px-2 py-1.5 border border-primary-light/30 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        value={pub.authorshipType}
                        onChange={(e) =>
                          handlePubChange(idx, "authorshipType", e.target.value)
                        }
                        disabled={role !== "faculty"}
                      >
                        <option value="">-</option>
                        <option value="単著">単著</option>
                        <option value="共著">共著</option>
                      </select>
                    </td>
                    <td className="px-3 py-2 border-r border-primary-light/20">
                      <input
                        type="date"
                        className="w-full px-2 py-1.5 border border-primary-light/30 rounded text-center text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        value={pub.publicationDate}
                        onChange={(e) =>
                          handlePubChange(
                            idx,
                            "publicationDate",
                            e.target.value,
                          )
                        }
                        disabled={role !== "faculty"}
                      />
                    </td>
                    <td className="px-3 py-2 border-r border-primary-light/20">
                      <input
                        type="text"
                        className="w-full px-2 py-1.5 border border-primary-light/30 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        value={pub.publisher}
                        onChange={(e) =>
                          handlePubChange(idx, "publisher", e.target.value)
                        }
                        disabled={role !== "faculty"}
                      />
                    </td>
                    <td className="px-3 py-2 border-r border-primary-light/20">
                      <textarea
                        rows={1}
                        className="w-full px-2 py-1.5 border border-primary-light/30 rounded text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary min-h-[40px]"
                        value={pub.summary}
                        onChange={(e) =>
                          handlePubChange(idx, "summary", e.target.value)
                        }
                        disabled={role !== "faculty"}
                      />
                    </td>
                    {role === "faculty" && (
                      <td className="px-2 py-2 text-center align-middle">
                        <button
                          onClick={() => handlePubRemoveRow(idx)}
                          className="text-gray-300 hover:text-red-500 transition-colors p-1"
                        >
                          <IconTrash size={16} />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <ActionButtons
        onPrint={() => window.print()}
        onSubmit={handleSubmit}
        submitLabel="保存"
        showSave={false}
      />
    </div>
  );
}
