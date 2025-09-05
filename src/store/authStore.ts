import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import broadcastChannelSync from "@/shared/utils/zustand/broadcastChannelSync";
import { getItem, setItem, removeItem } from "@/shared/utils/localStorage";

// User type definition
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role?: string;
}

// Auth store state interface
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

// Auth store actions interface
interface AuthActions {
  login: (user: User, token: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
}

// Combined store interface
type AuthStore = AuthState & AuthActions;

// Persisted state type
type PersistedState = Pick<AuthState, "user" | "token">;

// Custom storage implementation using our localStorage utilities
const customStorage = createJSONStorage<PersistedState>(() => ({
  getItem: (name: string): string | null => {
    const value = getItem<PersistedState | null>(name, null);
    return value ? JSON.stringify(value) : null;
  },
  setItem: (name: string, value: string): void => {
    try {
      const parsedValue = JSON.parse(value) as PersistedState;
      setItem(name, parsedValue);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error parsing value for localStorage:", error);
    }
  },
  removeItem: (name: string): void => {
    removeItem(name);
  },
}));

export const useAuthStore = create<AuthStore>()(
  broadcastChannelSync("auth")(
    persist(
      (set, get) => ({
        // Initial state
        user: null,
        token: null,

        // Derived state
        get isAuthenticated() {
          const state = get();
          return !!(state.user && state.token);
        },

        // Actions
        login: (user: User, token: string) => {
          set({ user, token });
        },

        logout: () => {
          set({ user: null, token: null });
        },

        setUser: (user: User) => {
          set({ user });
        },

        setToken: (token: string) => {
          set({ token });
        },
      }),
      {
        name: "auth-storage",
        storage: customStorage,
        partialize: (state) => ({
          user: state.user,
          token: state.token,
        }),
      }
    )
  )
);

// Selector hooks for better performance
export const useAuth = () =>
  useAuthStore((state) => ({
    user: state.user,
    token: state.token,
    isAuthenticated: state.isAuthenticated,
  }));

export const useAuthActions = () =>
  useAuthStore((state) => ({
    login: state.login,
    logout: state.logout,
    setUser: state.setUser,
    setToken: state.setToken,
  }));
