import type { StatusEnum } from '../enums/status-enum';
import type { TypeEnum } from '../enums/type-enum';
import type { Creator } from './creator';

export interface Task {
  id: number;
  creator: Creator;
  type: TypeEnum;
  description: string;
  dateCreated: Date;
  dueDate: Date;
  status: StatusEnum;
}