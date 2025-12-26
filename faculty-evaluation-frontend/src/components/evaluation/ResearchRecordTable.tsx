"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui";
import { PageHeader } from "@/components/ui/PageHeader";
import { ActionButtons } from "@/components/form/ActionButtons";
import { RESEARCH_RECORD_CONFIG } from "@/config/research.config";
import type { ResearchRecordData } from "@/types/research";

export interface ResearchRecordTableProps {
  data: ResearchRecordData;
  role?: "faculty" | "manager" | "admin";
}

// Info Section - Horizontal layout like Performance
function InfoSection({ data }: { data: ResearchRecordData }) {
  const fields = [
    { label: "氏名", value: data.facultyInfo.name },
    { label: "学部・学科", value: data.facultyInfo.department },
    { label: "職員番号", value: data.facultyInfo.employeeNumber },
    { label: "職名", value: data.facultyInfo.position },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
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

// Section Component with gradient header
interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <Card variant="elevated" padding="none" className="mb-6">
      <div className="bg-gradient-to-r from-primary-dark to-primary text-white px-4 py-3 font-semibold text-sm">
        {title}
      </div>
      <div className="overflow-x-auto">{children}</div>
    </Card>
  );
}

export function ResearchRecordTable({
  data,
  role = "faculty",
}: ResearchRecordTableProps) {
  const config = RESEARCH_RECORD_CONFIG;

  // State for all education records
  const [educationRecords, setEducationRecords] = useState(
    data.educationRecords
  );

  // State for job records
  const [jobRecords, setJobRecords] = useState(data.jobRecords);

  // State for publications
  const [publications, setPublications] = useState(data.publications);

  const handleEducationChange = (
    categoryIndex: number,
    itemIndex: number,
    field: "title" | "date" | "summary",
    value: string
  ) => {
    setEducationRecords((prev) => {
      const newRecords = [...prev];
      if (!newRecords[categoryIndex].items[itemIndex]) {
        newRecords[categoryIndex].items[itemIndex] = {
          title: "",
          date: "",
          summary: "",
        };
      }
      newRecords[categoryIndex].items[itemIndex][field] = value;
      return newRecords;
    });
  };

  const handleJobChange = (
    categoryIndex: number,
    field: "date" | "summary",
    value: string
  ) => {
    setJobRecords((prev) => {
      const newRecords = [...prev];
      if (field === "date") {
        newRecords[categoryIndex] = {
          ...newRecords[categoryIndex],
          date: value,
        };
      } else {
        newRecords[categoryIndex] = {
          ...newRecords[categoryIndex],
          summary: value,
        };
      }
      return newRecords;
    });
  };

  const handlePublicationChange = (
    index: number,
    field: keyof (typeof publications)[0],
    value: string
  ) => {
    setPublications((prev) => {
      const newPubs = [...prev];
      newPubs[index] = { ...newPubs[index], [field]: value };
      return newPubs;
    });
  };

  const handleSubmit = () => {
    console.log("Submit research record:", {
      educationRecords,
      jobRecords,
      publications,
    });
    alert("教育研究業績書を保存しました！");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader title={config.title} year={data.year} />

      {/* Info Section - Horizontal */}
      <InfoSection data={data} />

      {/* Section 1: 教育上の能力 */}
      <Section title="教育上の能力に関する事項">
        <table className="w-full text-sm">
          <thead className="bg-background-subtle">
            <tr>
              <th className="px-3 py-3 text-center font-semibold text-text-primary border-b border-r border-primary-light/30 w-[35%]">
                項目
              </th>
              <th className="px-3 py-3 text-center font-semibold text-text-primary border-b border-r border-primary-light/30 w-[15%]">
                年月日
              </th>
              <th className="px-3 py-3 text-center font-semibold text-text-primary border-b border-primary-light/30">
                概要
              </th>
            </tr>
          </thead>
          <tbody>
            {config.educationItems.map((item, catIdx) => {
              const record = educationRecords[catIdx];
              return (
                <React.Fragment key={item.category}>
                  {/* Category Header Row - Separate full-width row */}
                  <tr className="bg-white">
                    <td
                      colSpan={3}
                      className="px-3 py-2 font-semibold text-text-secondary border-b border-primary-light/30"
                    >
                      {item.category}
                    </td>
                  </tr>
                  {/* Input Row - 1 row only */}
                  <tr className="border-b border-primary-light/30">
                    <td className="px-3 py-3 border-r border-primary-light/30">
                      <input
                        type="text"
                        placeholder={item.placeholder}
                        className="w-full px-2 py-1 border border-primary-light/30 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        value={record?.items[0]?.title || ""}
                        onChange={(e) =>
                          handleEducationChange(
                            catIdx,
                            0,
                            "title",
                            e.target.value
                          )
                        }
                        disabled={role !== "faculty"}
                      />
                    </td>
                    <td className="px-3 py-3 border-r border-primary-light/30">
                      <input
                        type="date"
                        className="w-full px-2 py-1 border border-primary-light/30 rounded text-center text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        value={record?.items[0]?.date || ""}
                        onChange={(e) =>
                          handleEducationChange(
                            catIdx,
                            0,
                            "date",
                            e.target.value
                          )
                        }
                        disabled={role !== "faculty"}
                      />
                    </td>
                    <td className="px-3 py-3">
                      <textarea
                        rows={2}
                        placeholder="概要を入力"
                        className="w-full px-2 py-1 border border-primary-light/30 rounded text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary"
                        style={{ minHeight: "50px", maxHeight: "200px" }}
                        value={record?.items[0]?.summary || ""}
                        onChange={(e) =>
                          handleEducationChange(
                            catIdx,
                            0,
                            "summary",
                            e.target.value
                          )
                        }
                        disabled={role !== "faculty"}
                      />
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </Section>

      {/* Section 2: 職務上の実績 */}
      <Section title="職務上の実績に関する事項">
        <table className="w-full text-sm">
          <thead className="bg-background-subtle">
            <tr>
              <th className="px-3 py-3 text-center font-semibold text-text-primary border-b border-r border-primary-light/30 w-[35%]">
                項目
              </th>
              <th className="px-3 py-3 text-center font-semibold text-text-primary border-b border-r border-primary-light/30 w-[15%]">
                年月日
              </th>
              <th className="px-3 py-3 text-center font-semibold text-text-primary border-b border-r border-primary-light/30">
                概要
              </th>
            </tr>
          </thead>
          <tbody>
            {config.jobItems.map((item, idx) => {
              const record = jobRecords[idx];
              return (
                <tr
                  key={item.category}
                  className="border-b border-primary-light/30"
                >
                  <td className="px-3 py-3 border-r border-primary-light/30">
                    <div className="font-semibold text-text-secondary mb-1">
                      {item.category}
                    </div>
                    <div className="text-xs text-text-muted whitespace-pre-line">
                      {item.description}
                    </div>
                  </td>
                  <td className="px-3 py-3 border-r border-primary-light/30">
                    <input
                      type="date"
                      className="w-full px-2 py-1 border border-primary-light/30 rounded text-center text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      value={record?.date || ""}
                      onChange={(e) =>
                        handleJobChange(idx, "date", e.target.value)
                      }
                      disabled={role !== "faculty"}
                    />
                  </td>
                  <td className="px-3 py-3">
                    <textarea
                      rows={3}
                      placeholder="概要を入力"
                      className="w-full px-2 py-1 border border-primary-light/30 rounded text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary"
                      style={{ minHeight: "50px", maxHeight: "300px" }}
                      value={record?.summary || ""}
                      onChange={(e) =>
                        handleJobChange(idx, "summary", e.target.value)
                      }
                      disabled={role !== "faculty"}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Section>

      {/* Section 3: 著書・学術論文等 */}
      <Section title="著書、学術論文等">
        <table className="w-full text-sm">
          <thead className="bg-background-subtle">
            <tr>
              <th className="px-3 py-3 text-center font-semibold text-text-primary border-b border-r border-primary-light/30 w-[25%]">
                著書名、学術論文等の名称
              </th>
              <th className="px-3 py-3 text-center font-semibold text-text-primary border-b border-r border-primary-light/30 w-[10%]">
                単著、共著の別
              </th>
              <th className="px-3 py-3 text-center font-semibold text-text-primary border-b border-r border-primary-light/30 w-[12%]">
                発行又は発表の年月
              </th>
              <th className="px-3 py-3 text-center font-semibold text-text-primary border-b border-r border-primary-light/30 w-[18%]">
                発行所、発表雑誌等又は発表学会等の名称
              </th>
              <th className="px-3 py-3 text-center font-semibold text-text-primary border-b  border-primary-light/30">
                概要
              </th>
            </tr>
          </thead>
          <tbody>
            {publications.map((pub, idx) => (
              <tr key={idx} className="border-b border-primary-light/30">
                {/* 著書名 */}
                <td className="px-3 py-3 border-r border-primary-light/30">
                  <input
                    type="text"
                    placeholder="著書名・論文名を入力"
                    className="w-full px-2 py-1 border border-primary-light/30 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    value={pub.title}
                    onChange={(e) =>
                      handlePublicationChange(idx, "title", e.target.value)
                    }
                    disabled={role !== "faculty"}
                  />
                </td>

                {/* 単著/共著 - Dropdown only (no badge) */}
                <td className="px-3 py-3 text-center border-r border-primary-light/30">
                  <select
                    className="w-full px-2 py-1 border border-primary-light/30 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    value={pub.authorshipType}
                    onChange={(e) =>
                      handlePublicationChange(
                        idx,
                        "authorshipType",
                        e.target.value
                      )
                    }
                    disabled={role !== "faculty"}
                  >
                    <option value="">-</option>
                    <option value="単著">単著</option>
                    <option value="共著">共著</option>
                  </select>
                </td>

                {/* 発行年月 - Date picker */}
                <td className="px-3 py-3 text-center border-r border-primary-light/30">
                  <input
                    type="date"
                    className="w-full px-2 py-1 border border-primary-light/30 rounded text-center text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    value={pub.publicationDate}
                    onChange={(e) =>
                      handlePublicationChange(
                        idx,
                        "publicationDate",
                        e.target.value
                      )
                    }
                    disabled={role !== "faculty"}
                  />
                </td>

                {/* 発行所 */}
                <td className="px-3 py-3 border-r border-primary-light/30">
                  <input
                    type="text"
                    placeholder="発行所・学会名を入力"
                    className="w-full px-2 py-1 border border-primary-light/30 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    value={pub.publisher}
                    onChange={(e) =>
                      handlePublicationChange(idx, "publisher", e.target.value)
                    }
                    disabled={role !== "faculty"}
                  />
                </td>

                {/* 概要 */}
                <td className="px-3 py-3">
                  <textarea
                    rows={2}
                    placeholder="概要を入力"
                    className="w-full px-2 py-1 border border-primary-light/30 rounded text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary"
                    style={{ minHeight: "50px", maxHeight: "200px" }}
                    value={pub.summary}
                    onChange={(e) =>
                      handlePublicationChange(idx, "summary", e.target.value)
                    }
                    disabled={role !== "faculty"}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      {/* Action Buttons - NO SIGNATURE for Research */}
      <ActionButtons
        onPrint={() => window.print()}
        onSubmit={handleSubmit}
        submitLabel="保存"
        showSave={false}
      />
    </div>
  );
}
