export const INDUSTRY_OPTIONS = [
  { value: '科技業', label: '科技業' },
  { value: '醫療產業', label: '醫療產業' },
  { value: '金融業', label: '金融業' },
  { value: '教育領域', label: '教育領域' },
  { value: '其他', label: '其他' },
] as const;

export const SESSION_OPTIONS = [
  { value: 'Session A', label: 'Session A' },
  { value: 'Session B', label: 'Session B' },
  { value: 'Session C', label: 'Session C' },
  { value: 'Session D', label: 'Session D' },
] as const;

export const DINNER_OPTIONS = [
  { value: true, label: '是' },
  { value: false, label: '否' },
] as const;

export const DIET_OPTIONS = [
  { value: '葷食', label: '葷食' },
  { value: '素食', label: '素食' },
  { value: '其他', label: '其他（請填寫）' },
] as const;

export const INDUSTRY_VALUES = INDUSTRY_OPTIONS.map(({ value }) => value);
export const SESSION_VALUES = SESSION_OPTIONS.map(({ value }) => value);
export const DINNER_VALUES = DINNER_OPTIONS.map(({ value }) => value);
export const DIET_VALUES = DIET_OPTIONS.map(({ value }) => value);
