import type { User } from "@/types/User";
import { create } from "zustand";

type UserStore = {
  id: number | null;
  username: string;
  setUserStore: (user: User) => void;
  clearUserStore: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  id: null,
  username: "",
  clearUserStore: () => set({ id: null, username: "" }),
  setUserStore: (user: User) => set({ id: user.id, username: user.username }),
}));
