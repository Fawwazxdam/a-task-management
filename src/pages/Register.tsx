import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useThemeStore } from '../stores/themeStore';
import { Moon, Sun, Mail, Lock, User, UserPlus, LogIn } from 'lucide-react';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const { register: registerUser } = useAuthStore();
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    if (data.password !== data.confirmPassword) {
      setError('Kata sandi tidak cocok');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const success = await registerUser(data.name, data.email, data.password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Pendaftaran gagal. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-all duration-500 relative ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-100 to-blue-200'}`}>
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-md w-full space-y-8">
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white/20 backdrop-blur-sm'}`}>
            <UserPlus className={`w-8 h-8 ${isDarkMode ? 'text-blue-400' : 'text-black'}`} />
          </div>
          <h2 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-black'} mb-2`}>
            Bergabunglah
          </h2>
          <p className={`${isDarkMode ? 'text-white/80' : 'text-gray-700'} text-lg`}>
            Buat akun Anda
          </p>
        </div>

        <div className={`backdrop-blur-md ${isDarkMode ? 'bg-gray-800/80' : 'bg-white/10'} p-8 rounded-2xl shadow-2xl border ${isDarkMode ? 'border-gray-700' : 'border-white/20'}`}>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                </div>
                <input
                  id="name"
                  {...register('name', { required: 'Nama wajib diisi' })}
                  type="text"
                  className={`appearance-none relative block w-full pl-10 pr-3 py-3 border ${isDarkMode ? 'border-gray-600 bg-gray-700/50 text-white placeholder-gray-400' : 'border-white/30 bg-white/10 text-black placeholder-gray-600'} rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-200`}
                  placeholder="Nama Lengkap"
                />
                {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                </div>
                <input
                  id="email"
                  {...register('email', { required: 'Email wajib diisi', pattern: { value: /^\S+@\S+$/i, message: 'Alamat email tidak valid' } })}
                  type="email"
                  className={`appearance-none relative block w-full pl-10 pr-3 py-3 border ${isDarkMode ? 'border-gray-600 bg-gray-700/50 text-white placeholder-gray-400' : 'border-white/30 bg-white/10 text-black placeholder-gray-600'} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-200`}
                  placeholder="Alamat email"
                />
                {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                </div>
                <input
                  id="password"
                  {...register('password', { required: 'Kata sandi wajib diisi', minLength: { value: 6, message: 'Kata sandi minimal 6 karakter' } })}
                  type="password"
                  className={`appearance-none relative block w-full pl-10 pr-3 py-3 border ${isDarkMode ? 'border-gray-600 bg-gray-700/50 text-white placeholder-gray-400' : 'border-white/30 bg-white/10 text-black placeholder-gray-600'} rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-200`}
                  placeholder="Kata sandi"
                />
                {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                </div>
                <input
                  id="confirmPassword"
                  {...register('confirmPassword', { required: 'Silakan konfirmasi kata sandi Anda' })}
                  type="password"
                  className={`appearance-none relative block w-full pl-10 pr-3 py-3 border ${isDarkMode ? 'border-gray-600 bg-gray-700/50 text-white placeholder-gray-400' : 'border-white/30 bg-white/10 text-black placeholder-gray-600'} rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-200`}
                  placeholder="Konfirmasi Kata Sandi"
                />
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-400">{errors.confirmPassword.message}</p>}
              </div>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                <p className="text-sm text-red-400 text-center">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <UserPlus className="w-5 h-5 mr-2" />
                  Buat Akun
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
              Sudah punya akun?{' '}
              <Link to="/login" className="font-semibold text-blue-400 hover:text-blue-600 transition-colors duration-200 flex items-center justify-center mt-2">
                <LogIn className="w-4 h-4 mr-1" />
                Masuk di sini
              </Link>
            </p>
          </div>
        </div>
      </div>

      {toggleDarkMode && (
        <button
          onClick={toggleDarkMode}
          className="absolute top-4 right-4 p-3 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-200"
          title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      )}
    </div>
  );
};

export default Register;