import { create } from "zustand";
import broadcastChannelSync from "../src/utils/zustand/broadcastChannelSync";

interface User {
  name: string;
  userId: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
}
const useAuthStore = create<AuthState>()(
  broadcastChannelSync("volunchain-sync-auth")((set: any, get: any) => ({
    user: null,
    setUser: (user: User) => set({ user }),
  }))
);

export default useAuthStore;
