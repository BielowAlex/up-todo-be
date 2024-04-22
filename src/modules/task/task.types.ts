export enum TaskStatusEnum {
  InProgress = 'IN_PROGRESS',
  Completed = 'COMPLETED',
  Archived = 'ARCHIVED',
}

export type ProgressResponse = {
  completedTask: number;
  total: number;
};
