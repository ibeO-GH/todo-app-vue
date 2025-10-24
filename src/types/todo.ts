export interface TodoDetail {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt?: string;
  userId?: number;
}

export type Todo = TodoDetail;
