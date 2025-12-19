"use client";

import React from "react";
import { cn } from "@/utils/cn";

export interface InstructionsBoxProps {
  title?: string;
  items: string[];
  footer?: string;
  variant?: "default" | "bordered" | "highlighted";
  numbered?: boolean;
  className?: string;
}

const InstructionsBox: React.FC<InstructionsBoxProps> = ({
  title = "内容の記入方法について",
  items,
  footer,
  variant = "default",
  numbered = true,
  className,
}) => {
  const variants = {
    default: "bg-background-subtle border border-primary-light/20",
    bordered: "bg-white border-2 border-primary-light/40",
    highlighted: "bg-primary-lightest/50 border border-primary-light/50",
  };

  return (
    <div className={cn("rounded-lg p-4", variants[variant], className)}>
      {title && (
        <h4 className="font-semibold text-text-primary mb-3">{title}</h4>
      )}

      {numbered ? (
        <ol className="list-decimal list-inside space-y-2 text-sm text-text-secondary">
          {items.map((item, index) => (
            <li key={index} className="leading-relaxed pl-1">
              {item}
            </li>
          ))}
        </ol>
      ) : (
        <ul className="list-disc list-inside space-y-2 text-sm text-text-secondary">
          {items.map((item, index) => (
            <li key={index} className="leading-relaxed pl-1">
              {item}
            </li>
          ))}
        </ul>
      )}

      {footer && (
        <p className="mt-4 text-sm text-text-secondary border-t border-primary-light/20 pt-3">
          {footer}
        </p>
      )}
    </div>
  );
};

// Default instructions for personal evaluation sheet
export const PERSONAL_EVALUATION_INSTRUCTIONS = [
  "「区分①」の中から３つ選ぶ（期首）。",
  "「選択」の中からそれぞれの区分に対応する内容を選ぶ（期首）。",
  "「上位方針」（所属学部の達成水準と重点活動項目）の中から、該当の内容を選び記入する（期首）。",
  "「個人目標値（達成基準）」は各目標について180文字以内で記入（期首）。",
  "「区分②」は「チャレンジ／通常／継続」等から選択（期首）。",
  "期中：「個人目標進捗度（期中）」に進捗状況を180文字以内で記入。",
  "期末：「個人目標進捗度（期末）」に最終実績・達成度・理由を180文字以内で記入。",
  "期末：「評価対象者１年間の振り返りコメント」に年間総括（最大250文字）。",
];

InstructionsBox.displayName = "InstructionsBox";

export { InstructionsBox };
