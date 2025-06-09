import type { StatusEnum } from '../enums/status-enum';
import type { TypeEnum } from '../enums/type-enum';

export interface Task {
  id: number;
  creator: number;
  type: TypeEnum;
  description: string;
  dateCreated: Date;
  dueDate: Date;
  status: StatusEnum;
}