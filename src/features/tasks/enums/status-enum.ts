export const statusEnumValues = [
  'TO_DO',
  'IN_PROGRESS',
  'IN_REVIEW',
  'DONE'
] as const;

export type StatusEnum = typeof statusEnumValues[number];

export const statusMapColors = new Map<string, string>([
  ['TO_DO', 'bg-gray-400'],
  ['IN_PROGRESS', 'bg-yellow-400'],
  ['IN_REVIEW', 'bg-green-400'],
  ['DONE', 'bg-blue-400'],
]);