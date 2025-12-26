// src/components/form/ActionButtons.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/Button";

export interface ActionButtonsProps {
  onPrint?: () => void;
  onSave?: () => void;
  onSubmit?: () => void;
  saveLabel?: string;
  submitLabel?: string;
  showPrint?: boolean;
  showSave?: boolean;
  showSubmit?: boolean;
  isLoading?: boolean;
  className?: string;
}

export function ActionButtons({
  onPrint,
  onSave,
  onSubmit,
  saveLabel = "下書き保存",
  submitLabel = "提出",
  showPrint = true,
  showSave = true,
  showSubmit = true,
  isLoading = false,
  className = "",
}: ActionButtonsProps) {
  return (
    <div className={`flex justify-end gap-3 ${className}`}>
      {showPrint && onPrint && (
        <Button
          variant="outline"
          size="md"
          onClick={onPrint}
          disabled={isLoading}
        >
          印刷
        </Button>
      )}

      {showSave && onSave && (
        <Button
          variant="outline"
          size="md"
          onClick={onSave}
          disabled={isLoading}
        >
          {saveLabel}
        </Button>
      )}

      {showSubmit && onSubmit && (
        <Button
          variant="primary"
          size="md"
          onClick={onSubmit}
          isLoading={isLoading}
        >
          {submitLabel}
        </Button>
      )}
    </div>
  );
}
