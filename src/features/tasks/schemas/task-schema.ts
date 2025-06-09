import { z } from 'zod';
import { typeEnumValues } from '../enums/type-enum';
import { statusEnumValues } from '../enums/status-enum';

const TYPE_VALUES: string[] = [...typeEnumValues];
const STATUS_VALUES: string[] = [...statusEnumValues];

export const taskSchema = z.object({
  type: z.enum(TYPE_VALUES as [string, ...string[]]),
  description: z.string().min(1, 'Description is required.'),
  dueDate: z.coerce.date(),
  status: z.enum(STATUS_VALUES as [string, ...string[]]),
})

export type TaskSchemaType = z.infer<typeof taskSchema>;