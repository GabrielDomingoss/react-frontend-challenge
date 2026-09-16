import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IAuthUser {
  email: string;
}

interface IAuthState {
  user: IAuthUser | null;
  token: string | null;
  login: (email: string) => void;
  logout: () => void;
}

export const useAuthStore = create<IAuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: (email) => {
        set({
          user: { email },
          token: crypto.randomUUID(),
        });
      },
      logout: () => {
        set({
          user: null,
          token: null,
        });
      },
    }),
    { name: "libris-auth" },
  ),
);
