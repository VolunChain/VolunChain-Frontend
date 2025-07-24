// Example usage with Zustand auth store
// This is a reference implementation showing how to integrate the Axios instance with your auth store

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axiosInstance, { setAuthStore } from './axios';

// Example auth store structure
interface User {
  id: string;
  email: string;
  name: string;
  role?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

// Example auth store implementation
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      login: (token: string, user: User) => {
        set({
          token,
          user,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        });
      },

      updateUser: (userUpdate: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...userUpdate },
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Connect the auth store to the Axios instance
// Call this function once in your app initialization (e.g., in _app.tsx or layout.tsx)
export const initializeAxiosAuth = () => {
  setAuthStore(useAuthStore);
};

// Example API calls using the configured Axios instance
export const apiClient = {
  // User-related API calls
  getProfile: () => axiosInstance.get('/users/profile'),
  updateProfile: (data: Partial<User>) => axiosInstance.put('/users/profile', data),
  
  // Authentication API calls
  login: (email: string, password: string) => 
    axiosInstance.post('/auth/login', { email, password }),
  register: (userData: any) => 
    axiosInstance.post('/auth/register', userData),
  refreshToken: () => 
    axiosInstance.post('/auth/refresh'),
  
  // Other API endpoints
  getVolunteers: () => axiosInstance.get('/volunteers'),
  getCompanies: () => axiosInstance.get('/companies'),
  getOpportunities: () => axiosInstance.get('/opportunities'),
};

export default axiosInstance;
