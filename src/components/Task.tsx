import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Task } from '../types/index';

interface TaskProps {
  task: Task;
  onDelete: (id: number) => void;
  onChangeStatus: (id: number, status: Task['status']) => void;
  isDarkMode?: boolean;
}

const getStatusColor = (status: Task['status'], isDarkMode: boolean) => {
  if (isDarkMode) {
    switch (status) {
      case 'pending':
        return 'bg-yellow-900/20 text-yellow-400';
      case 'on_progress':
        return 'bg-blue-900/20 text-blue-400';
      case 'completed':
        return 'bg-green-900/20 text-green-400';
      default:
        return 'bg-gray-900/20 text-gray-400';
    }
  } else {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'on_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
};

const TaskComponent: React.FC<TaskProps> = ({ task, onDelete, onChangeStatus, isDarkMode = false }) => {
  const navigate = useNavigate();

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/tasks/${task.id}/edit`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(task.id);
  };

  return (
    <div
      onClick={() => navigate(`/tasks/${task.id}`)}
      className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 mb-3 border hover:border-gray-300 cursor-pointer ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-100 hover:border-gray-200'}`}
    >
      <div className="flex-1 mb-3 sm:mb-0">
        <div className="flex flex-col sm:flex-row sm:items-center mb-2">
          <h3 className={`text-lg font-semibold mr-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{task.title}</h3>
          <select
            value={task.status}
            onChange={(e) => {
              e.stopPropagation();
              onChangeStatus(task.id, e.target.value as Task['status']);
            }}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${getStatusColor(task.status, isDarkMode)}`}
          >
            <option value="pending">Pending</option>
            <option value="on_progress">On Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{task.description}</p>
      </div>
      <div className="flex space-x-2 sm:ml-4">
        <button
          onClick={handleEdit}
          className={`p-2 rounded-lg transition-all duration-200 ${isDarkMode ? 'text-blue-400 hover:text-blue-300 hover:bg-gray-700' : 'text-blue-500 hover:text-blue-700 hover:bg-blue-50'}`}
          title="Edit task"
        >
          <Edit size={20} />
        </button>
        <button
          onClick={handleDelete}
          className={`p-2 rounded-lg transition-all duration-200 ${isDarkMode ? 'text-red-400 hover:text-red-300 hover:bg-gray-700' : 'text-red-500 hover:text-red-700 hover:bg-red-50'}`}
          title="Delete task"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default TaskComponent;