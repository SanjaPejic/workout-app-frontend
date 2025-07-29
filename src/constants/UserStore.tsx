import type { User } from "@/types/User";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserStore = {
  id: number | null;
  username: string;
  setUserStore: (user: User) => void;
  clearUserStore: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      id: null,
      username: "",
      clearUserStore: () => set({ id: null, username: "" }),
      setUserStore: (user: User) =>
        set({ id: user.id, username: user.username }),
    }),
    {
      name: "user-storage", // name of the item in localStorage
    }
  )
);
