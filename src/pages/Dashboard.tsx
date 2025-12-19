import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import type { Task } from '../types/index';
import { Moon, Sun, LogOut, Plus } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useThemeStore } from '../stores/themeStore';
import { useNavigate } from 'react-router-dom';
import { taskApi } from '../services/api';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<Task['status'] | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await taskApi.getAll();
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await taskApi.delete(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const changeStatus = async (id: number, status: Task['status']) => {
    try {
      const response = await taskApi.patch(id, { status });
      setTasks(tasks.map(t => t.id === id ? response.data : t));
    } catch (error) {
      console.error('Error changing status:', error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });


  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-linear-to-br from-gray-900 to-gray-800' : 'bg-linear-to-br from-blue-50 to-indigo-100'}`}>
      {/* Navbar */}
      <nav className={`w-full transition-colors duration-300 ${isDarkMode ? 'bg-gray-800/95 backdrop-blur-sm border-b border-gray-700' : 'bg-white/95 backdrop-blur-sm border-b border-gray-200'} shadow-sm`}>
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>TASK MANAGEMENT</h1>
            <div className="flex items-center space-x-4">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Welcome, {user?.name}</span>
              <button
                onClick={handleLogout}
                className={`p-2 rounded-lg transition-all duration-200 ${isDarkMode ? 'text-red-400 hover:text-red-300 hover:bg-gray-700' : 'text-red-500 hover:text-red-700 hover:bg-red-50'}`}
                title="Logout"
              >
                <LogOut size={20} />
              </button>
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-all duration-200 ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="w-full max-w-none p-4 pt-8">

        {/* Controls */}
        <div className={`mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between p-4 rounded-lg shadow-md transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Cari tugas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'}`}
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as Task['status'] | 'all')}
              className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="on_progress">On Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
          </div>
        </div>

        <div className="mb-6">
          <button
            onClick={() => navigate('/tasks/add')}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Tambah Tugas Baru
          </button>
        </div>
        <TaskList
          tasks={filteredTasks}
          onDelete={deleteTask}
          onChangeStatus={changeStatus}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
};

export default Dashboard;