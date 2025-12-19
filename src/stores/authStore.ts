import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { userApi } from '../services/api';

interface User {
  id: string;
  email: string;
  name: string;
}

interface UserWithPassword extends User {
  password: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        try {
          const response = await userApi.getAll();
          const users: UserWithPassword[] = response.data;
          const user = users.find(u => u.email === email && u.password === password);
          if (user) {
            const { password: _, ...userWithoutPassword } = user;
            set({ user: userWithoutPassword, isAuthenticated: true });
            return true;
          }
          return false;
        } catch (error) {
          console.error('Login error:', error);
          return false;
        }
      },
      register: async (name: string, email: string, password: string) => {
        try {
          const response = await userApi.getAll();
          const users: UserWithPassword[] = response.data;
          const existingUser = users.find(u => u.email === email);
          if (existingUser) {
            return false; // User already exists
          }
          const newUser: UserWithPassword = { id: Date.now().toString(), email, name, password };
          await userApi.create(newUser);
          const { password: _, ...userWithoutPassword } = newUser;
          set({ user: userWithoutPassword, isAuthenticated: true });
          return true;
        } catch (error) {
          console.error('Register error:', error);
          return false;
        }
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);