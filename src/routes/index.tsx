import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AddTask from '../pages/AddTask';
import EditTask from '../pages/EditTask';
import TaskDetail from '../pages/TaskDetail';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/tasks/add" element={
        <ProtectedRoute>
          <AddTask />
        </ProtectedRoute>
      } />
      <Route path="/tasks/:id/edit" element={
        <ProtectedRoute>
          <EditTask />
        </ProtectedRoute>
      } />
      <Route path="/tasks/:id" element={
        <ProtectedRoute>
          <TaskDetail />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default AppRoutes;