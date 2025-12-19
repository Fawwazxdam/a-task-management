export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'on_progress' | 'completed';
}

export type TaskStatus = Task['status'];