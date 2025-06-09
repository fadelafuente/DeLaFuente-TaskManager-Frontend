export const statusEnumValues = [
  'TO_DO',
  'IN_PROGRESS',
  'IN_REVIEW',
  'DONE'
] as const;

export type StatusEnum = typeof statusEnumValues[number];