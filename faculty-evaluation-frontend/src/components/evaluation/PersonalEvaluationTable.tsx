"use client";

import React, { useState, useRef } from "react";
import { 
  IconPlus, 
  IconFileSpreadsheet,
  IconUpload, 
  IconTrash,
  IconChevronDown,
  IconChevronUp
} from "@tabler/icons-react";
import { Card, Badge, Button } from "@/components/ui";
import { PageHeader } from "@/components/ui/PageHeader";
import { SignatureSection } from "@/components/form/SignatureSection";
import { ActionButtons } from "@/components/form/ActionButtons";
import { PERSONAL_EVALUATION_CONFIG } from "@/config/personal.config";
import type { PersonalEvaluationData, PersonalGoalItem } from "@/types/personal";

export interface PersonalEvaluationTableProps {
  data: PersonalEvaluationData;
  role?: "faculty" | "manager" | "admin";
}

// --- Helper Components ---

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

// --- CSV Helper Functions ---

const downloadCSV = (headers: string[], rows: (string | number)[][], filename: string) => {
  const csvContent =
    '\uFEFF' + 
    headers.join(',') + 
    '\n' + 
    rows.map((row) => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
    
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 100);
};

const parseCSV = (text: string): string[][] => {
  const result: string[][] = [];
  let row: string[] = [];
  let inQuotes = false;
  let currentToken = '';

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        currentToken += '"';
        i++; // Skip next quote
      } else if (char === '"') {
        inQuotes = false;
      } else {
        currentToken += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        row.push(currentToken);
        currentToken = '';
      } else if (char === '\n' || char === '\r') {
        row.push(currentToken);
        currentToken = '';
        if (row.length > 0) result.push(row);
        row = [];
        if (char === '\r' && nextChar === '\n') i++; // Handle CRLF
      } else {
        currentToken += char;
      }
    }
  }
  if (currentToken || row.length > 0) {
    row.push(currentToken);
    result.push(row);
  }
  return result;
};

// --- Main Component ---

export function PersonalEvaluationTable({
  data,
  role = "faculty",
}: PersonalEvaluationTableProps) {
  const config = PERSONAL_EVALUATION_CONFIG;
  
  // Independent States for two tables
  const [goals, setGoals] = useState<PersonalGoalItem[]>(data.goals);
  const [evaluations, setEvaluations] = useState<PersonalGoalItem[]>(JSON.parse(JSON.stringify(data.goals)));
  const [showInstructions, setShowInstructions] = useState(false);

  const [reflectionComment, setReflectionComment] = useState(data.reflectionComment);
  const [signature, setSignature] = useState({
    evaluatorPosition: data.evaluatorPosition || "学部長",
    evaluatorName: data.evaluatorName || "佐藤 一郎",
    signatureDate: data.signatureDate || { year: "", month: "", day: "" },
  });

  // Refs for File Inputs
  const goalFileInputRef = useRef<HTMLInputElement>(null);

  // --- Handlers for Goals Table ---

  const handleGoalChange = (idx: number, field: keyof PersonalGoalItem, value: string) => {
    setGoals(prev => {
      const newGoals = [...prev];
      newGoals[idx] = { ...newGoals[idx], [field]: value };
      return newGoals;
    });
  };

  const addGoalRows = (count: number) => {
    const newRows = Array(count).fill(null).map(() => ({
      id: Math.random().toString(36).substr(2, 9),
      category1: "", selection: "", upperPolicy: "", personalGoal: "", 
      progressMid: "", progressEnd: "", category2: "",
      aiScore: 0, aiEvaluation: 0, aiSummary: ""
    } as PersonalGoalItem));
    setGoals(prev => [...prev, ...newRows]);
    // Optionally sync evaluations rows here if needed, but keeping independent as requested
  };

  const removeGoalRow = (idx: number) => {
    setGoals(prev => prev.filter((_, i) => i !== idx));
  };

  const downloadGoalsCSV = () => {
    const headers = ['区分①', '選択', '上位方針（所属学部の達成水準と重点活動項目）', '個人目標値（達成基準）', '個人目標進捗度（期中）', '個人目標進捗度（期末）', '区分②'];
    const rows = goals.map(g => [g.category1, g.selection, g.upperPolicy, g.personalGoal, g.progressMid, g.progressEnd, g.category2]);
    downloadCSV(headers, rows, 'goals_sample.csv');
  };

  const importGoalsCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result as string;
      const parsed = parseCSV(text);
      // Skip header, map to objects (Simple implementation)
      if (parsed.length > 1) {
        const newGoals = parsed.slice(1).map(row => ({
          id: Math.random().toString(36).substr(2, 9),
          category1: row[0] || "",
          selection: row[1] || "",
          upperPolicy: row[2] || "",
          personalGoal: row[3] || "",
          progressMid: row[4] || "",
          progressEnd: row[5] || "",
          category2: row[6] || "",
          aiScore: 0, aiEvaluation: 0, aiSummary: ""
        } as PersonalGoalItem));
        setGoals(prev => [...prev, ...newGoals]);
        alert(`${newGoals.length} 行追加しました`);
      }
    };
    reader.readAsText(file);
    if (goalFileInputRef.current) goalFileInputRef.current.value = "";
  };

  // --- Handlers for Evaluation Table ---

  const handleEvalChange = (idx: number, field: keyof PersonalGoalItem, value: string) => {
    setEvaluations(prev => {
      const newEvals = [...prev];
      newEvals[idx] = { ...newEvals[idx], [field]: value };
      return newEvals;
    });
  };

  // --- Shared Handlers ---

  const handleSignatureChange = (field: string, value: string | { year: string; month: string; day: string }) => {
    setSignature(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Submit:", { goals, evaluations, reflectionComment, signature });
    alert("提出しました！");
  };

  return (
    <div className="space-y-6">
      <PageHeader title={config.title} year={data.year} />
      
      {/* Instructions Section (Moved to Top & Collapsible) */}
      <div className="border border-primary-light/30 rounded-lg overflow-hidden bg-white shadow-sm">
        <button
          onClick={() => setShowInstructions(!showInstructions)}
          className="w-full flex items-center justify-between p-4 bg-background-subtle hover:bg-primary-light/10 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="font-semibold text-text-primary text-sm">内容の記入方法について</span>
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
              {config.instructionSteps.map((step, idx) => (
                <p key={idx}>
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-primary-light/30 text-xs mr-2">
                    {idx + 1}
                  </span>
                  {step}
                </p>
              ))}

              {/* BỔ SUNG ĐOẠN CODE NÀY ĐỂ HIỂN THỊ NOTE */}
              {config.instructionNote && (
                <p className="mt-4 text-text-secondary pl-1 border-t border-primary-light/10 pt-2">
                  {config.instructionNote}
                </p>
              )}
              
            </div>
          </div>
        )}
      </div>

      <InfoAndScoreSection data={data} />

      {/* --- TABLE 1: GOALS --- */}
      <Card variant="elevated" padding="none" className="relative rounded-none" allowStickyChildren={true}>
        {/* Hidden File Input */}
        <input 
          type="file" 
          ref={goalFileInputRef} 
          className="hidden" 
          accept=".csv" 
          onChange={importGoalsCSV}
        />
        
        {/* Sticky Action Bar */}
        <div className="sticky top-0 z-40 flex items-center justify-end gap-2 p-3 bg-white/95 backdrop-blur-sm border-b border-primary-light/20">
          <Button variant="outline" size="sm" onClick={() => addGoalRows(1)} className="bg-white gap-1 h-8 text-xs"><IconPlus size={14} /> 1行追加</Button>
          <Button variant="outline" size="sm" onClick={() => addGoalRows(5)} className="bg-white gap-1 h-8 text-xs"><IconPlus size={14} /> 5行追加</Button>
          <div className="h-6 w-px bg-primary-light/30 mx-2" />
          <Button variant="outline" size="sm" onClick={downloadGoalsCSV} className="bg-white gap-1 text-text-secondary h-8 text-xs"><IconFileSpreadsheet size={14} /> サンプルダウンロード</Button>
          <Button variant="outline" size="sm" onClick={() => goalFileInputRef.current?.click()} className="bg-white gap-1 text-text-secondary h-8 text-xs"><IconUpload size={14} /> CSV一括取込</Button>
        </div>

        {/* Table Content */}
        <div className="">
          <table className="w-full text-sm">
            <thead className="sticky top-[57px] z-30 bg-gradient-to-r from-primary-dark to-primary text-white shadow-md">
              <tr>
                <th className="px-3 py-3 text-center font-semibold w-[100px] border-r border-white/50">区分①</th>
                <th className="px-3 py-3 text-center font-semibold w-[100px] border-r border-white/50">選択</th>
                <th className="px-3 py-3 text-left font-semibold border-r border-white/50">上位方針（所属学部の達成水準と重点活動項目）</th>
                <th className="px-3 py-3 text-left font-semibold w-[200px] border-r border-white/50">個人目標値（達成基準）</th>
                <th className="px-3 py-3 text-left font-semibold w-[200px] border-r border-white/50">個人目標進捗度（期中）</th>
                <th className="px-3 py-3 text-left font-semibold w-[200px] border-r border-white/50">個人目標進捗度（期末）</th>
                <th className="px-3 py-3 text-center font-semibold w-[100px] border-r border-white/50">区分②</th>
                <th className="px-3 py-3 text-center font-semibold w-[50px]">削除</th>
              </tr>
            </thead>
            <tbody>
              {goals.map((goal, idx) => (
                <tr key={goal.id} className="hover:bg-background-subtle transition-colors border-b border-primary-light/30">
                  <td className="px-2 py-2 text-center border-r border-primary-light/30">
                    <select
                      className="w-full p-1 border border-primary-light/30 rounded text-sm"
                      value={goal.category1}
                      onChange={(e) => handleGoalChange(idx, "category1", e.target.value)}
                      disabled={role !== "faculty"}
                    >
                      <option value="">-</option>
                      <option value="教育">教育</option>
                      <option value="研究">研究</option>
                      <option value="社会貢献">社会貢献</option>
                    </select>
                  </td>
                  <td className="px-2 py-2 border-r border-primary-light/30">
                    <input
                      type="text"
                      className="w-full p-1 border border-primary-light/30 rounded text-sm"
                      value={goal.selection}
                      onChange={(e) => handleGoalChange(idx, "selection", e.target.value)}
                      disabled={role !== "faculty"}
                    />
                  </td>
                  <td className="px-2 py-2 border-r border-primary-light/30">
                    <textarea rows={2} className="w-full p-1 border border-primary-light/30 rounded text-sm resize-y" value={goal.upperPolicy} onChange={(e) => handleGoalChange(idx, "upperPolicy", e.target.value)} disabled={role !== "faculty"} />
                  </td>
                  <td className="px-2 py-2 border-r border-primary-light/30">
                    <textarea rows={2} className="w-full p-1 border border-primary-light/30 rounded text-sm resize-y" value={goal.personalGoal} onChange={(e) => handleGoalChange(idx, "personalGoal", e.target.value)} disabled={role !== "faculty"} />
                  </td>
                  <td className="px-2 py-2 border-r border-primary-light/30">
                    <textarea rows={2} className="w-full p-1 border border-primary-light/30 rounded text-sm resize-y" value={goal.progressMid} onChange={(e) => handleGoalChange(idx, "progressMid", e.target.value)} disabled={role !== "faculty"} />
                  </td>
                  <td className="px-2 py-2 border-r border-primary-light/30">
                    <textarea rows={2} className="w-full p-1 border border-primary-light/30 rounded text-sm resize-y" value={goal.progressEnd} onChange={(e) => handleGoalChange(idx, "progressEnd", e.target.value)} disabled={role !== "faculty"} />
                  </td>
                  <td className="px-2 py-2 text-center border-r border-primary-light/30">
                    <select
                      className="w-full p-1 border border-primary-light/30 rounded text-sm"
                      value={goal.category2}
                      onChange={(e) => handleGoalChange(idx, "category2", e.target.value)}
                      disabled={role !== "faculty"}
                    >
                      <option value="">-</option>
                      <option value="チャレンジ">チャレンジ</option>
                      <option value="通常">通常</option>
                      <option value="継続">継続</option>
                    </select>
                  </td>
                  <td className="px-2 py-2 text-center">
                    {role === "faculty" && (
                      <button onClick={() => removeGoalRow(idx)} className="text-gray-400 hover:text-red-500 transition-colors">
                        <IconTrash size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* --- TABLE 2: EVALUATION (READ ONLY STRUCTURE) --- */}
      <Card variant="elevated" padding="none" className="relative rounded-none" allowStickyChildren={true}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 z-30 bg-gradient-to-r from-primary-dark to-primary text-white shadow-md">
              <tr>
                <th className="px-3 py-3 text-center font-semibold w-[80px] border-r border-white/50">個別評点</th>
                <th className="px-3 py-3 text-center font-semibold w-[100px] border-r border-white/50">AIスコア</th>
                <th className="px-3 py-3 text-center font-semibold w-[100px] border-r border-white/50">AI評価</th>
                <th className="px-3 py-3 text-center font-semibold w-[100px] border-r border-white/50">評価</th>
                <th className="px-3 py-3 text-left font-semibold border-r border-white/50">AI評価概要</th>
              </tr>
            </thead>
            <tbody>
              {evaluations.map((goal, idx) => (
                <tr key={goal.id} className="border-b border-primary-light/30 hover:bg-background-subtle">
                  <td className="px-3 py-3 text-center border-r border-primary-light/30">
                    <input
                      type="number"
                      min="1"
                      max="4"
                      className="w-16 px-2 py-1 border border-primary-light/30 rounded text-center text-sm"
                      value={goal.individualScore || ""}
                      onChange={(e) => handleEvalChange(idx, "individualScore", e.target.value)}
                      disabled={role !== "manager"}
                    />
                  </td>
                  <td className="px-3 py-3 text-center text-primary font-semibold border-r border-primary-light/30">{goal.aiScore}</td>
                  <td className="px-3 py-3 text-center border-r border-primary-light/30">
                    <Badge variant={getScoreBadgeVariant(goal.aiEvaluation)}>{goal.aiEvaluation}</Badge>
                  </td>
                  <td className="px-3 py-3 text-center border-r border-primary-light/30">
                    {goal.evaluation ? <Badge variant={getScoreBadgeVariant(goal.evaluation)}>{goal.evaluation}</Badge> : <span className="text-text-muted">-</span>}
                  </td>
                  <td className="px-3 py-3 text-text-muted text-xs border-r border-primary-light/30">{goal.aiSummary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Comment Box */}
      <div className="border border-primary-light/30 rounded-lg p-4 bg-white">
        <h3 className="font-semibold text-text-primary mb-2 text-sm">評価対象者1年間の振り返りコメント</h3>
        <textarea
          rows={6}
          maxLength={250}
          className="w-full px-4 py-3 border border-primary-light/30 rounded text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="コメントを入力..."
          value={reflectionComment}
          onChange={(e) => setReflectionComment(e.target.value)}
          disabled={role !== "faculty"}
        />
        <p className="text-xs text-text-muted mt-1 text-right">{reflectionComment.length}/250</p>
      </div>

      <SignatureSection
        evaluatorPosition={signature.evaluatorPosition}
        evaluatorName={signature.evaluatorName}
        signatureDate={signature.signatureDate}
        onChange={handleSignatureChange}
        readonly={role !== "manager"}
      />

      <ActionButtons
        onPrint={() => window.print()}
        onSubmit={handleSubmit}
        submitLabel={role === "faculty" ? "提出" : "承認"}
        showSave={false}
      />
    </div>
  );
}