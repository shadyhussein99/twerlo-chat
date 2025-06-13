import toast from "react-hot-toast";
import { create } from "zustand";

interface IAuthStore {
  isAuthenticated: boolean;
  login: (data: { email: string; password: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  isAuthenticated: false,
  login: (data) => {
    if (data.email === "test@chat.com" && data.password === "123456") {
      return set(() => ({ isAuthenticated: true })); //TODO: Add to cookies or session storage
    } else {
      toast.error("Email or Password is incorrect");
    }
  },
  logout: () => set(() => ({ isAuthenticated: false })),
}));
