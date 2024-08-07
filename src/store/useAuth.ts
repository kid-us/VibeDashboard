import create from "zustand";

interface AuthState {
  email: string | null;
  type: string | null;
  isAuthenticated: boolean;
  login: (email: string, type: string) => void;
  logout: () => void;
}

const useAuth = create<AuthState>((set) => ({
  email: null,
  type: null,
  isAuthenticated: false,

  login: (email, type) => set({ email, type, isAuthenticated: true }),
  logout: () => set({ email: null, type: null, isAuthenticated: false }),
}));

export default useAuth;
