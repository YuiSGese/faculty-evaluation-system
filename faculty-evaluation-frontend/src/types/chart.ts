/**
 * Types for Chart Components
 */

// Radar chart category
export interface RadarCategory {
  id: string;
  name: string;
  value: number;
  maxValue: number;
  color?: string;
}

// Radar chart configuration
export interface RadarChartConfig {
  centerX: number;
  centerY: number;
  maxRadius: number;
  gridLevels: number;
  showLabels: boolean;
  showValues: boolean;
  showGrid: boolean;
  animated: boolean;
}

// Default radar chart config
export const DEFAULT_RADAR_CONFIG: RadarChartConfig = {
  centerX: 200,
  centerY: 200,
  maxRadius: 160,
  gridLevels: 5,
  showLabels: true,
  showValues: true,
  showGrid: true,
  animated: true,
};

// Radar chart props
export interface RadarChartProps {
  categories: RadarCategory[];
  config?: Partial<RadarChartConfig>;
  title?: string;
  showLegend?: boolean;
  showStats?: boolean;
  className?: string;
}

// Stat card for displaying individual scores
export interface StatCardData {
  label: string;
  value: number;
  maxValue?: number;
  color?: string;
}

// Full-time faculty radar categories (8 axes)
export const FULLTIME_RADAR_CATEGORIES = [
  { id: 'booksPapers', name: '著書論文', maxValue: 50 },
  { id: 'education', name: '教育関連', maxValue: 40 },
  { id: 'conference', name: '学会発表', maxValue: 80 },
  { id: 'music', name: '音楽関連', maxValue: 160 },
  { id: 'art', name: '芸術関連', maxValue: 120 },
  { id: 'socialContribution', name: '社会貢献', maxValue: 50 },
  { id: 'universityManagement', name: '大学運営', maxValue: 15 },
  { id: 'externalFunding', name: '外部資金', maxValue: 10 },
] as const;

// Part-time faculty radar categories (6 axes)
export const PARTTIME_RADAR_CATEGORIES = [
  { id: 'booksPapers', name: '著書論文', maxValue: 50 },
  { id: 'education', name: '教育関連', maxValue: 40 },
  { id: 'conference', name: '学会発表', maxValue: 80 },
  { id: 'music', name: '音楽関連', maxValue: 160 },
  { id: 'art', name: '芸術関連', maxValue: 120 },
  { id: 'socialContribution', name: '社会貢献', maxValue: 50 },
] as const;

// Chart color palette
export const CHART_COLORS = {
  primary: '#2196f3',
  primaryLight: 'rgba(33, 150, 243, 0.3)',
  secondary: '#667eea',
  accent: '#764ba2',
  grid: '#e3f2fd',
  gridMajor: '#bbdefb',
  axis: '#90caf9',
  label: '#1565c0',
  scaleLabel: '#64b5f6',
  dataPoint: '#1976d2',
  dataPointHover: '#0d47a1',
  white: '#ffffff',
} as const;
