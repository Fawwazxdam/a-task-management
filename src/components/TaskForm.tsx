import React from 'react';
import { useForm } from 'react-hook-form';
import type { Task } from '../types';

interface TaskFormData {
  title: string;
  description: string;
  status: Task['status'];
}

interface TaskFormProps {
  onSubmit: (task: TaskFormData) => void;
  editingTask: Task | null;
  onCancel?: () => void;
  isDarkMode?: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, editingTask, onCancel, isDarkMode = false }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskFormData>({
    defaultValues: editingTask ? { title: editingTask.title, description: editingTask.description, status: editingTask.status } : { title: '', description: '', status: 'pending' }
  });

  const onFormSubmit = (data: TaskFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className={`p-6 rounded-xl shadow-lg mb-6 border transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
      <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
        {editingTask ? 'Edit Task' : 'Add New Task'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="title" className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Title</label>
          <input
            id="title"
            {...register('title', { required: 'Title is required' })}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'}`}
            placeholder="Enter task title"
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
        </div>
        <div>
          <label htmlFor="status" className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Status</label>
          <select
            id="status"
            {...register('status')}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
          >
            <option value="pending">Pending</option>
            <option value="on_progress">On Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="description" className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Description</label>
        <textarea
          id="description"
          {...register('description', { required: 'Description is required' })}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'}`}
          rows={4}
          placeholder="Enter task description"
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 font-medium"
        >
          {editingTask ? 'Update Task' : 'Add Task'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className={`px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 font-medium ${isDarkMode ? 'bg-gray-600 text-white hover:bg-gray-500 focus:ring-gray-500' : 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500'}`}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;