import axios, { 
  AxiosError, 
  AxiosRequestConfig, 
  AxiosResponse 
} from 'axios';

// Define the expected structure of the auth store
interface AuthStore {
  getState: () => {
    token: string | null;
  };
  setState?: (state: any) => void;
}

// This will be set when the auth store is available
let authStore: AuthStore | null = null;

// Function to set the auth store reference
export const setAuthStore = (store: AuthStore) => {
  authStore = store;
};

// Create the Axios instance
const axiosInstance = axios.create({
// You can update this to use environment variables
  baseURL: 'http://localhost:3001/api', 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add authentication token
axiosInstance.interceptors.request.use(
  (config: any) => {
    // Get token from auth store if available
    const token = authStore?.getState()?.token;
    
    if (token) {
      // Ensure headers object exists
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle unauthorized responses
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle 401 Unauthorized responses
    if (error.response?.status === 401) {
      // Auto-logout the user by clearing auth state
      if (authStore?.setState) {
        authStore.setState({
          token: null,
          user: null,
          isAuthenticated: false,
        });
      }
      
      // Optionally redirect to login page
      if (typeof window !== 'undefined') {
        // Clear any stored auth data from localStorage
        localStorage.removeItem('auth-storage');
        
        // Redirect to login page if not already there
        const currentPath = window.location.pathname;
        if (!currentPath.includes('/login') && !currentPath.includes('/auth')) {
          window.location.href = '/login';
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
