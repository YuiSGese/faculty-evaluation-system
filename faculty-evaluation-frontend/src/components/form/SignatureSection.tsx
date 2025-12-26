"use client";

import React from "react";
import { Card } from "@/components/ui/Card";

export interface SignatureSectionProps {
  evaluatorPosition: string;
  evaluatorName: string;
  signatureDate: {
    year: string;
    month: string;
    day: string;
  };
  onChange?: (
    field: string,
    value: string | { year: string; month: string; day: string }
  ) => void;
  readonly?: boolean;
}

export function SignatureSection({
  evaluatorPosition,
  evaluatorName,
  signatureDate,
  onChange,
  readonly = false,
}: SignatureSectionProps) {
  const handleChange = (field: string, value: string) => {
    if (!onChange) return;

    if (field === "year" || field === "month" || field === "day") {
      onChange("signatureDate", {
        ...signatureDate,
        [field]: value,
      });
    } else {
      onChange(field, value);
    }
  };

  return (
    <div className="flex justify-end">
      <div className="w-full max-w-lg">
        <Card variant="bordered" padding="md">
          <h3 className="text-center font-bold text-text-primary mb-6 pb-3 border-b-2 border-primary-light/50">
            評価者名
          </h3>

          <table className="w-full text-sm">
            <tbody>
              {/* 役職名 */}
              <tr className="">
                <td className="px-4 py-3 font-semibold text-text-primary w-20%]">
                  役職名
                </td>
                <td className="px-4 py-3">
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-primary-light/30 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    value={evaluatorPosition}
                    onChange={(e) =>
                      handleChange("evaluatorPosition", e.target.value)
                    }
                    disabled={readonly}
                  />
                </td>
              </tr>

              {/* 氏名 */}
              <tr className="">
                <td className="px-4 py-3 font-semibold text-text-primary">
                  氏名
                </td>
                <td className="px-4 py-3">
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-primary-light/30 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    value={evaluatorName}
                    onChange={(e) =>
                      handleChange("evaluatorName", e.target.value)
                    }
                    disabled={readonly}
                  />
                </td>
              </tr>

              {/* 令和 */}
              <tr>
                <td className="px-4 py-3 font-semibold text-text-primary">
                  令和
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      max="99"
                      placeholder="年"
                      className="w-20 px-3 py-2 border border-primary-light/30 rounded text-center focus:outline-none focus:ring-2 focus:ring-primary"
                      value={signatureDate.year}
                      onChange={(e) => handleChange("year", e.target.value)}
                      disabled={readonly}
                    />
                    <span className="text-text-secondary">年</span>

                    <input
                      type="number"
                      min="1"
                      max="12"
                      placeholder="月"
                      className="w-20 px-3 py-2 border border-primary-light/30 rounded text-center focus:outline-none focus:ring-2 focus:ring-primary"
                      value={signatureDate.month}
                      onChange={(e) => handleChange("month", e.target.value)}
                      disabled={readonly}
                    />
                    <span className="text-text-secondary">月</span>

                    <input
                      type="number"
                      min="1"
                      max="31"
                      placeholder="日"
                      className="w-20 px-3 py-2 border border-primary-light/30 rounded text-center focus:outline-none focus:ring-2 focus:ring-primary"
                      value={signatureDate.day}
                      onChange={(e) => handleChange("day", e.target.value)}
                      disabled={readonly}
                    />
                    <span className="text-text-secondary">日</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
