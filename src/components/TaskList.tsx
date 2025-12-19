import React from 'react';
import TaskComponent from './Task';
import type { Task } from '../types/index';

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  onChangeStatus: (id: number, status: Task['status']) => void;
  isDarkMode?: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onChangeStatus, isDarkMode = false }) => {
  if (tasks.length === 0) {
    return <p className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Tidak ada tugas tersedia. Tambahkan tugas baru!</p>;
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskComponent
          key={task.id}
          task={task}
          onDelete={onDelete}
          onChangeStatus={onChangeStatus}
          isDarkMode={isDarkMode}
        />
      ))}
    </div>
  );
};

export default TaskList;