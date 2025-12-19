"use client";

import React from "react";
import { cn } from "@/utils/cn";
import { TableRow } from "./TableRow";
import { TableCell } from "./TableCell";
import { NumberInput } from "@/components/ui/NumberInput";
import { TextArea } from "@/components/ui/TextArea";
import type { ScoreItem, ColumnConfig, ItemConfig } from "@/types";
import { useTableContext } from "./TableContext";

export interface ItemRowProps {
  categoryId: string;
  item: ItemConfig;
  data: ScoreItem;
  columns: ColumnConfig[];
  className?: string;
}

const ItemRow: React.FC<ItemRowProps> = ({
  categoryId,
  item,
  data,
  columns,
  className,
}) => {
  const { onTableChange, readonly } = useTableContext();

  const handleChange = (
    field: keyof ScoreItem,
    value: ScoreItem[keyof ScoreItem]
  ) => {
    onTableChange?.(categoryId, item.id, field, value);
  };

  return (
    <TableRow variant="item" className={className}>
      {columns.map((column) => {
        // Item name column
        if (column.id === "item") {
          return (
            <TableCell key={column.id} variant="label" className="pl-8">
              {item.name}
            </TableCell>
          );
        }

        const value = data[column.id as keyof ScoreItem];

        // Determine cell variant based on column flags
        let cellVariant: "default" | "ai-score" | "evaluation" | "overview" =
          "default";
        if (column.isAI) cellVariant = "ai-score";
        if (column.isEvaluation) cellVariant = "evaluation";
        if (column.isOverview) cellVariant = "overview";

        // Number input
        if (column.type === "number") {
          return (
            <TableCell key={column.id} variant={cellVariant}>
              <NumberInput
                value={typeof value === "number" ? value : 0}
                onChange={(v: number) =>
                  handleChange(column.id as keyof ScoreItem, v)
                }
                variant="table"
                disabled={readonly || column.readonly}
                step={column.step}
                min={column.min}
                max={column.max}
                placeholder={column.placeholder}
              />
            </TableCell>
          );
        }

        // Textarea
        if (column.type === "textarea") {
          return (
            <TableCell key={column.id} variant={cellVariant}>
              <TextArea
                value={typeof value === "string" ? value : ""}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  handleChange(column.id as keyof ScoreItem, e.target.value)
                }
                variant="table"
                disabled={readonly}
                placeholder={column.placeholder}
                rows={2}
              />
            </TableCell>
          );
        }

        // Text input (Default)
        return (
          <TableCell key={column.id} variant={cellVariant}>
            <input
              type="text"
              value={typeof value === "string" ? value : ""}
              onChange={(e) =>
                handleChange(column.id as keyof ScoreItem, e.target.value)
              }
              disabled={readonly}
              placeholder={column.placeholder}
              className={cn(
                "w-full px-2 py-1 text-center text-sm",
                "bg-white border border-primary-light/30 rounded shadow-sm",
                "focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary-light/20",
                "disabled:cursor-not-allowed disabled:bg-background-subtle"
              )}
            />
          </TableCell>
        );
      })}
    </TableRow>
  );
};

ItemRow.displayName = "ItemRow";

export { ItemRow };
