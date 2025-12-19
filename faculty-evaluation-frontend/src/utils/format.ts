/**
 * Format number with decimal places
 */
export function formatNumber(value: number, decimals: number = 1): string {
  return value.toFixed(decimals);
}

/**
 * Format date to Japanese format (令和X年X月X日)
 */
export function formatDateJP(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  // Convert to Reiwa era (令和 started May 1, 2019)
  const reiwaYear = year - 2018;
  
  return `令和${reiwaYear}年${month}月${day}日`;
}

/**
 * Format date to standard format (YYYY/MM/DD)
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
}

/**
 * Format fiscal year (年度)
 */
export function formatFiscalYear(year: number): string {
  return `${year}年度`;
}

/**
 * Parse Japanese date string to Date object
 */
export function parseDateJP(dateStr: string): Date | null {
  // Match patterns like "令和6年12月8日" or "2024年12月8日"
  const reiwaMatch = dateStr.match(/令和(\d+)年(\d+)月(\d+)日/);
  if (reiwaMatch) {
    const [, reiwaYear, month, day] = reiwaMatch;
    const year = parseInt(reiwaYear) + 2018;
    return new Date(year, parseInt(month) - 1, parseInt(day));
  }
  
  const standardMatch = dateStr.match(/(\d{4})年(\d+)月(\d+)日/);
  if (standardMatch) {
    const [, year, month, day] = standardMatch;
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  }
  
  return null;
}

/**
 * Format employee number with padding
 */
export function formatEmployeeNumber(num: number | string, length: number = 6): string {
  return String(num).padStart(length, '0');
}
