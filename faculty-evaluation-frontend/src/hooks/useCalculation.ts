"use client";

import { useState, useCallback } from "react";
import type { TableConfig, ScoreItem, TableData, CategoryData } from "@/types";
import { createEmptyScoreItem } from "@/types";
// Import hàm tính toán từ utils
import { recalculateTable } from "@/utils/calculation";

export interface UseCalculationProps {
  config: TableConfig;
  initialData?: TableData<ScoreItem>;
  autoCalculate?: boolean;
}

export interface UseCalculationReturn {
  data: TableData<ScoreItem>;
  updateItem: (
    categoryId: string,
    itemId: string,
    field: keyof ScoreItem,
    value: ScoreItem[keyof ScoreItem]
  ) => void;
  updateTotal: (
    categoryId: string,
    field: keyof ScoreItem,
    value: ScoreItem[keyof ScoreItem]
  ) => void;
  updateGrandTotal: (
    field: keyof ScoreItem,
    value: ScoreItem[keyof ScoreItem]
  ) => void;
  resetData: () => void;
}

// Helper khởi tạo dữ liệu rỗng
function initializeData(config: TableConfig): TableData<ScoreItem> {
  const categories: Record<string, CategoryData<ScoreItem>> = {};
  config.categories.forEach((category) => {
    const items: Record<string, ScoreItem> = {};
    category.items.forEach((item) => {
      items[item.id] = createEmptyScoreItem();
    });
    categories[category.id] = { items, total: createEmptyScoreItem() };
  });
  return { categories, grandTotal: createEmptyScoreItem() };
}

export function useCalculation({
  config,
  initialData,
  autoCalculate = true,
}: UseCalculationProps): UseCalculationReturn {
  const [data, setData] = useState<TableData<ScoreItem>>(() => {
    if (initialData) return initialData;
    return initializeData(config);
  });

  // Update Item -> Gọi Utils để tính lại toàn bộ
  const updateItem = useCallback(
    (
      categoryId: string,
      itemId: string,
      field: keyof ScoreItem,
      value: ScoreItem[keyof ScoreItem]
    ) => {
      setData((prev) => {
        const category = prev.categories[categoryId];
        if (!category) return prev;

        // 1. Cập nhật giá trị vào object tạm
        const newItems = { ...category.items };
        newItems[itemId] = { ...newItems[itemId], [field]: value };

        let newData: TableData<ScoreItem> = {
          ...prev,
          categories: {
            ...prev.categories,
            [categoryId]: { ...category, items: newItems },
          },
        };

        // 2. Nếu bật autoCalculate -> Gọi hàm từ Utils xử lý
        if (autoCalculate) {
          newData = recalculateTable(newData);
        }

        return newData;
      });
    },
    [autoCalculate]
  );

  // Update Total thủ công -> Gọi Utils để tính lại Grand Total
  const updateTotal = useCallback(
    (
      categoryId: string,
      field: keyof ScoreItem,
      value: ScoreItem[keyof ScoreItem]
    ) => {
      setData((prev) => {
        const category = prev.categories[categoryId];
        if (!category) return prev;

        // 1. Cập nhật giá trị Total
        let newData: TableData<ScoreItem> = {
          ...prev,
          categories: {
            ...prev.categories,
            [categoryId]: {
              ...category,
              total: { ...category.total, [field]: value },
            },
          },
        };

        // 2. Tính lại (Grand Total sẽ được cập nhật nhờ hàm này)
        if (autoCalculate) {
          newData = recalculateTable(newData);
        }

        return newData;
      });
    },
    [autoCalculate]
  );

  const updateGrandTotal = useCallback(
    (field: keyof ScoreItem, value: ScoreItem[keyof ScoreItem]) => {
      setData((prev) => ({
        ...prev,
        grandTotal: {
          ...(prev.grandTotal || createEmptyScoreItem()),
          [field]: value,
        } as ScoreItem,
      }));
    },
    []
  );

  const resetData = useCallback(() => {
    setData(initializeData(config));
  }, [config]);

  return {
    data,
    updateItem,
    updateTotal,
    updateGrandTotal,
    resetData,
  };
}
