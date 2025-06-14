import { create } from "zustand";
import Cookies from "js-cookie";
import { storageNames } from "../constants/storageNames";

interface IAuthStore {
  isAuthenticated: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  isAuthenticated: Cookies.get(storageNames.accessToken) ? true : false,
  login: (accessToken) => {
    Cookies.set(storageNames.accessToken, accessToken, {
      expires: 7,
      sameSite: "strict",
    });

    set({ isAuthenticated: true });
  },
  logout: () => {
    Cookies.remove(storageNames.accessToken);
    set({ isAuthenticated: false });
  },
  initializeAuth: () => {
    const token = Cookies.get(storageNames.accessToken);
    if (token) {
      set({
        isAuthenticated: true,
      });
    }
  },
}));
