"use client";

import React from "react";
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

interface ScoreDefinition {
  score: string;
  label: string;
  quantitativeRange: string;
  qualitativeDescription: string;
}

const DEFAULT_SCORE_DEFINITIONS: ScoreDefinition[] = [
  {
    score: "S",
    label: "卓越",
    quantitativeRange: "120%以上",
    qualitativeDescription:
      "期待される水準を大きく上回り、\n他の模範となる成果を上げている。",
  },
  {
    score: "A",
    label: "優秀",
    quantitativeRange: "100% - 120%",
    qualitativeDescription:
      "期待される水準を上回る成果を上げている。\n自律的に業務を遂行している。",
  },
  {
    score: "B",
    label: "標準",
    quantitativeRange: "80% - 100%",
    qualitativeDescription:
      "期待される水準通りの成果を上げている。\n標準的な業務遂行ができている。",
  },
  {
    score: "C",
    label: "要改善",
    quantitativeRange: "80%未満",
    qualitativeDescription:
      "期待される水準に達していない。\n改善や指導が必要な状態である。",
  },
];
// --------------------------------------------------

export interface ScoreDefinitionTableProps {
  definitions?: ScoreDefinition[];
  className?: string;
}

const ScoreDefinitionTable: React.FC<ScoreDefinitionTableProps> = ({
  definitions = DEFAULT_SCORE_DEFINITIONS,
  className,
}) => {
  return (
    <table
      className={cn("border-collapse text-sm", "min-w-[500px]", className)}
    >
      <thead>
        <tr>
          <th className="border border-primary-light/30 bg-background-subtle text-text-secondary px-4 py-2 font-semibold w-20">
            評点
          </th>
          {definitions.map((def) => (
            <th
              key={def.score}
              className="border border-primary-light/30 bg-background-subtle text-text-secondary px-4 py-2 font-semibold w-24"
            >
              {def.score}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* 定義 row */}
        <tr>
          <th className="border border-primary-light/30 bg-background-subtle text-text-secondary px-4 py-2 font-semibold">
            定義
          </th>
          {definitions.map((def) => (
            <td
              key={def.score}
              className="border border-primary-light/30 text-text-primary px-3 py-2 text-center"
            >
              {def.label}
            </td>
          ))}
        </tr>

        {/* 定量基準 row */}
        <tr>
          <th className="border border-primary-light/30 bg-background-subtle text-text-secondary px-4 py-2 font-semibold">
            定量基準(%)
          </th>
          {definitions.map((def) => (
            <td
              key={def.score}
              className="border border-primary-light/30 text-text-primary px-3 py-2 text-center"
            >
              {def.quantitativeRange}
            </td>
          ))}
        </tr>

        {/* 定性基準 row */}
        <tr>
          <th className="border border-primary-light/30 bg-background-subtle text-text-secondary px-4 py-2 font-semibold">
            定性基準
          </th>
          {definitions.map((def) => (
            <td
              key={def.score}
              className="border border-primary-light/30 text-text-primary px-3 py-2 text-center text-xs leading-relaxed"
            >
              {def.qualitativeDescription.split("\n").map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < def.qualitativeDescription.split("\n").length - 1 && (
                    <br />
                  )}
                </React.Fragment>
              ))}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

ScoreDefinitionTable.displayName = "ScoreDefinitionTable";

export { ScoreDefinitionTable };
