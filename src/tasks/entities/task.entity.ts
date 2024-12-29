export const TASK_STATUS = ['TODO', 'ON_PROGRESS', 'DONE', 'ARCHIVED'] as const;

export type TypeTaskStatus = (typeof TASK_STATUS)[number];

export class Task {
  id: number;
  title: string;
  description: string;
  status: TypeTaskStatus;
  ownerId: number;
  createdAt: number; // unix timestamp
  updatedAt: number; // unix timestamp
  isDeleted: boolean;
}
