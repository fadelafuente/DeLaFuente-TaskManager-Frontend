export const typeEnumValues = [
  'TASK',
  'SUBTASK',
  'ISSUE',
  'ENHANCEMENT',
  'DOCUMENTATION'
] as const;

export type TypeEnum = typeof typeEnumValues[number];

export const typeMapColors = new Map<string, string>([
  ['TASK', 'bg-teal-400'],
  ['SUBTASK', 'bg-violet-400'],
  ['ISSUE', 'bg-red-400'],
  ['ENHANCEMENT', 'bg-green-400'],
  ['DOCUMENTATION', 'bg-blue-400'],
]);