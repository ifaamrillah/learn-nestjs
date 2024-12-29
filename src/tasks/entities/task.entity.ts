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

  constructor(id: number, title: string, description: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = 'TODO';
    this.ownerId = -1;
    this.updatedAt = Date.now();
    this.createdAt = Date.now();
    this.isDeleted = false;
  }
}
