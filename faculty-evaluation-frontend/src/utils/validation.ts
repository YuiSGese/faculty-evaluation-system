/**
 * Validation utilities for form inputs
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validate required field
 */
export function validateRequired(
  value: unknown,
  fieldName: string
): ValidationResult {
  if (
    value === null ||
    value === undefined ||
    (typeof value === "string" && value.trim() === "")
  ) {
    return { isValid: false, error: `${fieldName}は必須項目です` };
  }

  return { isValid: true };
}

/**
 * Validate number range
 */
export function validateNumberRange(
  value: number,
  min: number,
  max: number,
  fieldName: string
): ValidationResult {
  if (isNaN(value)) {
    return { isValid: false, error: `${fieldName}は数値を入力してください` };
  }
  if (value < min || value > max) {
    return {
      isValid: false,
      error: `${fieldName}は${min}から${max}の範囲で入力してください`,
    };
  }
  return { isValid: true };
}

/**
 * Validate score (0-100 or custom range)
 */
export function validateScore(
  value: number,
  maxScore: number = 100,
  fieldName: string = "得点"
): ValidationResult {
  return validateNumberRange(value, 0, maxScore, fieldName);
}

/**
 * Validate text length
 */
export function validateTextLength(
  value: string,
  maxLength: number,
  fieldName: string
): ValidationResult {
  if (value.length > maxLength) {
    return {
      isValid: false,
      error: `${fieldName}は${maxLength}文字以内で入力してください`,
    };
  }
  return { isValid: true };
}

/**
 * Validate evaluation rating (1-4)
 */
export function validateEvaluationRating(value: number): ValidationResult {
  if (!Number.isInteger(value) || value < 1 || value > 4) {
    return { isValid: false, error: "評価は1から4の整数で入力してください" };
  }
  return { isValid: true };
}

/**
 * Validate employee number format
 */
export function validateEmployeeNumber(value: string): ValidationResult {
  if (!/^\d{1,10}$/.test(value)) {
    return { isValid: false, error: "職員番号は数字のみで入力してください" };
  }
  return { isValid: true };
}

/**
 * Combine multiple validations
 */
export function validateAll(validations: ValidationResult[]): ValidationResult {
  for (const validation of validations) {
    if (!validation.isValid) {
      return validation;
    }
  }
  return { isValid: true };
}
