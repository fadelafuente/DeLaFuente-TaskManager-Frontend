export const typeEnumValues = [
  'TASK',
  'SUBTASK',
  'ISSUE',
  'ENHANCEMENT',
  'DOCUMENTATION'
] as const;

export type TypeEnum = typeof typeEnumValues[number];