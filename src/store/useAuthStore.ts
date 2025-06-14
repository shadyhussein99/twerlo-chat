import { create } from "zustand";

interface IAuthStore {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  isAuthenticated: false,
  login: () => set(() => ({ isAuthenticated: true })), //TODO: Add to cookies or session storage,
  logout: () => set(() => ({ isAuthenticated: false })),
}));
