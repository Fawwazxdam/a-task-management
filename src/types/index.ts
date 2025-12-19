export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'on_progress' | 'completed';
}

export type TaskStatus = Task['status'];