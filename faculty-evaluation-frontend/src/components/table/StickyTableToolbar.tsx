"use client";

import React from "react";
import { IconPlus, IconFileSpreadsheet, IconUpload } from "@tabler/icons-react";
import { Button } from "@/components/ui/Button";

interface StickyTableToolbarProps {
  // Các hàm xử lý sự kiện. Nếu hàm nào không được truyền vào, nút tương ứng sẽ KHÔNG hiển thị.
  onAddRow?: (count: number) => void;
  onAddFiveRows?: () => void;
  onDownloadSample?: () => void;
  onImportCSV?: () => void;

  // Custom label nếu muốn đổi tên nút
  downloadLabel?: string;
  importLabel?: string;
}

export function StickyTableToolbar({
  onAddRow,
  onAddFiveRows,
  onDownloadSample,
  onImportCSV,
  downloadLabel = "サンプルダウンロード",
  importLabel = "CSV一括取込",
}: StickyTableToolbarProps) {
  // Kiểm tra xem có nút nào được bật không. Nếu không có nút nào, trả về null (không render gì cả)
  const hasActions =
    onAddRow || onAddFiveRows || onDownloadSample || onImportCSV;
  if (!hasActions) return null;

  return (
    <div className="sticky top-0 z-40 flex items-center justify-end gap-2 p-3 bg-white/95 backdrop-blur-sm border-b border-primary-light/20">
      {/* Nút Thêm 1 dòng */}
      {onAddRow && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAddRow(1)}
          className="bg-white gap-1 h-8 text-xs"
        >
          <IconPlus size={14} /> 1行追加
        </Button>
      )}

      {/* Nút Thêm 5 dòng - Nếu onAddFiveRows được truyền riêng */}
      {onAddFiveRows && (
        <Button
          variant="outline"
          size="sm"
          onClick={onAddFiveRows}
          className="bg-white gap-1 h-8 text-xs"
        >
          <IconPlus size={14} /> 5行追加
        </Button>
      )}

      {/* Hoặc nếu dùng chung onAddRow nhưng muốn nút 5 dòng tự động hiện khi có onAddRow */}
      {!onAddFiveRows && onAddRow && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAddRow(5)}
          className="bg-white gap-1 h-8 text-xs"
        >
          <IconPlus size={14} /> 5行追加
        </Button>
      )}

      {/* Đường kẻ ngăn cách: Chỉ hiện khi có nhóm nút thêm dòng VÀ nhóm nút file */}
      {(onAddRow || onAddFiveRows) && (onDownloadSample || onImportCSV) && (
        <div className="h-6 w-px bg-primary-light/30 mx-2" />
      )}

      {/* Nút Download */}
      {onDownloadSample && (
        <Button
          variant="outline"
          size="sm"
          onClick={onDownloadSample}
          className="bg-white gap-1 text-text-secondary h-8 text-xs"
        >
          <IconFileSpreadsheet size={14} /> {downloadLabel}
        </Button>
      )}

      {/* Nút Import */}
      {onImportCSV && (
        <Button
          variant="outline"
          size="sm"
          onClick={onImportCSV}
          className="bg-white gap-1 text-text-secondary h-8 text-xs"
        >
          <IconUpload size={14} /> {importLabel}
        </Button>
      )}
    </div>
  );
}
