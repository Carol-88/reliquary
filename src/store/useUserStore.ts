import { create } from "zustand";

type UserState = {
  name: string;
  level: number;
  setUser: (name: string, level: number) => void;
};

export const useUserStore = create<UserState>((set) => ({
  name: "",
  level: 1,
  setUser: (name, level) => set({ name, level }),
}));
