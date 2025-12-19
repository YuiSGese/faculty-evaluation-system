"use client";

import React from "react";
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}
// ------------------------------------------

export interface RatingScale {
  category: string;
  ratings: string[];
}

export interface RatingScaleTableProps {
  scales: RatingScale[];
  ratingLabels?: string[];
  className?: string;
}

const DEFAULT_RATING_LABELS = ["1", "2", "3", "4"];

const RatingScaleTable: React.FC<RatingScaleTableProps> = ({
  scales,
  ratingLabels = DEFAULT_RATING_LABELS,
  className,
}) => {
  return (
    <table className={cn("border-collapse text-xs", className)}>
      <thead>
        <tr>
          <th className="border border-primary-light/30 bg-background-subtle text-text-secondary px-3 py-2 font-semibold">
            評価
          </th>
          {ratingLabels.map((label) => (
            <th
              key={label}
              className="border border-primary-light/30 bg-background-subtle text-text-secondary px-3 py-2 font-semibold min-w-[80px]"
            >
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {scales.map((scale, index) => (
          <tr key={index}>
            <th className="border border-primary-light/30 bg-background-subtle text-text-secondary px-3 py-2 font-semibold text-left">
              {scale.category}
            </th>
            {scale.ratings.map((rating, rIndex) => (
              <td
                key={rIndex}
                className="border border-primary-light/30 text-text-primary px-2 py-2 text-center leading-relaxed"
              >
                {rating.split("\n").map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < rating.split("\n").length - 1 && <br />}
                  </React.Fragment>
                ))}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Default scales for educator behavior evaluation
export const EDUCATOR_RATING_SCALES: RatingScale[] = [
  {
    category: "教育活動実績",
    ratings: [
      "ほとんど実績がない",
      "一定程度の実績",
      "十分な実績",
      "想定以上の実績",
    ],
  },
  {
    category: "授業運営・学生サポート",
    ratings: [
      "どちらかといえば\n行動していない",
      "どちらかといえば\n行動している",
      "良く行動している\nいつも行動している",
      "常識を上回ること\nを継続できるレベル",
    ],
  },
];

RatingScaleTable.displayName = "RatingScaleTable";

export { RatingScaleTable };
