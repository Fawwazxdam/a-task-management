import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Calendar, User, CheckCircle, Clock, AlertCircle, Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../stores/themeStore';
import { taskApi } from '../services/api';
import type { Task } from '../types/index';

const TaskDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      if (!id) return;

      try {
        const response = await taskApi.getById(id);
        setTask(response.data);
      } catch (error) {
        console.error('Error fetching task:', error);
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!task || !window.confirm('Are you sure you want to delete this task?')) return;

    setDeleteLoading(true);
    try {
      await taskApi.delete(task.id);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: Task['status']) => {
    if (!task) return;

    try {
      const response = await taskApi.patch(task.id, { status: newStatus });
      setTask(response.data);
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'on_progress':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: Task['status']) => {
    if (isDarkMode) {
      switch (status) {
        case 'completed':
          return 'bg-green-900/20 text-green-400 border-green-700';
        case 'on_progress':
          return 'bg-blue-900/20 text-blue-400 border-blue-700';
        case 'pending':
          return 'bg-yellow-900/20 text-yellow-400 border-yellow-700';
        default:
          return 'bg-gray-900/20 text-gray-400 border-gray-700';
      }
    } else {
      switch (status) {
        case 'completed':
          return 'bg-green-100 text-green-800 border-green-200';
        case 'on_progress':
          return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'pending':
          return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        default:
          return 'bg-gray-100 text-gray-800 border-gray-200';
      }
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${isDarkMode ? 'bg-linear-to-br from-gray-900 to-gray-800' : 'bg-linear-to-br from-blue-50 via-indigo-100 to-blue-200'}`}>
        <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${isDarkMode ? 'border-blue-400' : 'border-blue-600'}`}></div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${isDarkMode ? 'bg-linear-to-br from-gray-900 to-gray-800' : 'bg-linear-to-br from-blue-50 via-indigo-100 to-blue-200'}`}>
        <div className="text-center">
          <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Tugas Tidak Ditemukan</h2>
          <button
            onClick={() => navigate('/dashboard')}
            className={`transition-colors duration-200 ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-8 transition-colors duration-300 ${isDarkMode ? 'bg-linear-to-br from-gray-900 to-gray-800' : 'bg-linear-to-br from-blue-50 via-indigo-100 to-blue-200'}`}>
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6 flex justify-between items-center">
          <button
            onClick={() => navigate('/dashboard')}
            className={`flex items-center transition-colors duration-200 ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
          <button
            onClick={toggleDarkMode}
            className={`p-3 rounded-full transition-all duration-200 ${isDarkMode ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-white text-gray-800 hover:bg-gray-50 shadow-md'}`}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>

        <div className={`rounded-2xl shadow-xl overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{task.title}</h1>
                <div className="flex items-center space-x-4">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(task.status)}`}>
                    {getStatusIcon(task.status)}
                    <span className="ml-2 capitalize">{task.status.replace('_', ' ')}</span>
                  </div>
                  <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Calendar className="w-4 h-4 mr-1" />
                    ID: {task.id}
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => navigate(`/tasks/${task.id}/edit`)}
                  className={`p-2 rounded-lg transition-colors duration-200 ${isDarkMode ? 'text-blue-400 hover:bg-gray-700' : 'text-blue-600 hover:bg-blue-50'}`}
                  title="Edit Task"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleteLoading}
                  className={`p-2 rounded-lg transition-colors duration-200 disabled:opacity-50 ${isDarkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-red-50'}`}
                  title="Delete Task"
                >
                  {deleteLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-600"></div>
                  ) : (
                    <Trash2 className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {task.description && (
              <div className="mb-8">
                <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Deskripsi</h3>
                <div className={`rounded-xl p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <p className={`whitespace-pre-wrap ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{task.description}</p>
                </div>
              </div>
            )}

            <div className="mb-8">
              <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Manajemen Status</h3>
              <div className="flex flex-wrap gap-2">
                {(['pending', 'on_progress', 'completed'] as Task['status'][]).map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      task.status === status
                        ? `${getStatusColor(status)} ring-2 ring-offset-2 ring-blue-500`
                        : isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {getStatusIcon(status)}
                    <span className="ml-2 capitalize">{status.replace('_', ' ')}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={`border-t pt-6 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className={`flex items-center justify-between text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  Created by system
                </div>
                <div>Last updated: {new Date().toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;