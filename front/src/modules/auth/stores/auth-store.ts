import { create } from "zustand";
import { User } from "../models/user";

interface AuthStore {
  user: User | null;
  setUser: (user: User | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  setUser: (user: User | null) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },
  token: localStorage.getItem("token") || null,
  setToken: (token: string | null) => {
    localStorage.setItem("token", token || "");
    set({ token });
  },
}));
