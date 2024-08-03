import create from "zustand";

interface AuthState {
  username: string | null;
  isAuthenticated: boolean;
  login: (username: string) => void;
  logout: () => void;
}

const useAuth = create<AuthState>((set) => ({
  username: null,
  isAuthenticated: false,

  login: (username) => set({ username, isAuthenticated: true }),
  logout: () => set({ username: null, isAuthenticated: false }),
}));

export default useAuth;
