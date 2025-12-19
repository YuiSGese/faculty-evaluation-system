"use client";

import React from "react";

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export interface SignatureEntry {
  id: string;
  position: string;
  name: string;
}

export interface SignatureSectionProps {
  title?: string;
  entries: SignatureEntry[];
  date?: {
    era?: string;
    year?: number;
    month?: number;
    day?: number;
  };
  maxEntries?: number;
  editable?: boolean;
  onChange?: (entries: SignatureEntry[]) => void;
  onDateChange?: (date: {
    year?: number;
    month?: number;
    day?: number;
  }) => void;
  className?: string;
}

const SignatureSection: React.FC<SignatureSectionProps> = ({
  title = "評価者名",
  entries,
  date,
  maxEntries = 3,
  editable = false,
  onChange,
  onDateChange,
  className,
}) => {
  const displayEntries = [
    ...entries,
    ...Array.from(
      { length: Math.max(0, maxEntries - entries.length) },
      (_, i) => ({
        id: `empty-${i}`,
        position: "",
        name: "",
      })
    ),
  ].slice(0, maxEntries);

  const handleEntryChange = (
    index: number,
    field: "position" | "name",
    value: string
  ) => {
    const newEntries = [...entries];
    if (index < entries.length) {
      newEntries[index] = { ...newEntries[index], [field]: value };
    } else {
      newEntries.push({
        id: crypto.randomUUID(),
        position: field === "position" ? value : "",
        name: field === "name" ? value : "",
      });
    }
    onChange?.(newEntries);
  };

  return (
    <div className={cn("", className)}>
      <table className="w-full border-collapse border border-primary-light/30">
        <thead>
          <tr>
            <th
              colSpan={2}
              className="border border-primary-light/30 bg-background-subtle text-text-secondary px-4 py-2 text-center font-semibold"
            >
              {title}
            </th>
          </tr>
          <tr>
            <th className="border border-primary-light/30 bg-background-subtle text-text-secondary px-4 py-2 text-center font-medium w-1/2">
              役職名
            </th>
            <th className="border border-primary-light/30 bg-background-subtle text-text-secondary px-4 py-2 text-center font-medium w-1/2">
              氏　名
            </th>
          </tr>
        </thead>
        <tbody>
          {displayEntries.map((entry, index) => (
            <tr key={entry.id}>
              <td className="border border-primary-light/30 px-4 py-3 h-12">
                {editable ? (
                  <input
                    type="text"
                    value={entry.position}
                    onChange={(e) =>
                      handleEntryChange(index, "position", e.target.value)
                    }
                    className="w-full text-center bg-transparent text-text-primary border-0 focus:outline-none focus:ring-1 focus:ring-primary-light/30 rounded"
                    placeholder=""
                  />
                ) : (
                  <span className="block text-center text-text-primary">
                    {entry.position}
                  </span>
                )}
              </td>
              <td className="border border-primary-light/30 px-4 py-3 h-12">
                {editable ? (
                  <input
                    type="text"
                    value={entry.name}
                    onChange={(e) =>
                      handleEntryChange(index, "name", e.target.value)
                    }
                    className="w-full text-center bg-transparent text-text-primary border-0 focus:outline-none focus:ring-1 focus:ring-primary-light/30 rounded"
                    placeholder=""
                  />
                ) : (
                  <span className="block text-center text-text-primary">
                    {entry.name}
                  </span>
                )}
              </td>
            </tr>
          ))}

          {date !== undefined && (
            <tr>
              <td className="border border-primary-light/30 text-text-primary px-4 py-3 text-center">
                {date.era || "令和"}
              </td>
              <td className="border border-primary-light/30 px-4 py-3">
                <div className="flex items-center justify-center gap-2 text-text-primary">
                  {editable ? (
                    <>
                      <input
                        type="number"
                        value={date.year || ""}
                        onChange={(e) =>
                          onDateChange?.({
                            ...date,
                            year: parseInt(e.target.value) || undefined,
                          })
                        }
                        className="w-12 text-center bg-transparent border-b border-primary-light/30 focus:outline-none focus:border-primary"
                        placeholder=""
                      />
                      <span>年</span>
                      <input
                        type="number"
                        value={date.month || ""}
                        onChange={(e) =>
                          onDateChange?.({
                            ...date,
                            month: parseInt(e.target.value) || undefined,
                          })
                        }
                        className="w-10 text-center bg-transparent border-b border-primary-light/30 focus:outline-none focus:border-primary"
                        placeholder=""
                        min={1}
                        max={12}
                      />
                      <span>月</span>
                      <input
                        type="number"
                        value={date.day || ""}
                        onChange={(e) =>
                          onDateChange?.({
                            ...date,
                            day: parseInt(e.target.value) || undefined,
                          })
                        }
                        className="w-10 text-center bg-transparent border-b border-primary-light/30 focus:outline-none focus:border-primary"
                        placeholder=""
                        min={1}
                        max={31}
                      />
                      <span>日</span>
                    </>
                  ) : (
                    <span>
                      {date.year && `${date.year}年`}
                      {date.month && `${date.month}月`}
                      {date.day && `${date.day}日`}
                    </span>
                  )}
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

SignatureSection.displayName = "SignatureSection";

export { SignatureSection };
