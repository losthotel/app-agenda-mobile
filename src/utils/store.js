// src/utils/store.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      settings: {
        username: "Usuário",
        avatarUrl: "",
        theme: "dark",           // ou "light" se preferir
        defaultTime: "09:00",
        notificationsEnabled: true,
      },
      updateSettings: (novasConfig) =>
        set((state) => ({
          settings: { ...state.settings, ...novasConfig },
        })),
    }),
    {
      name: "agenda-settings", // salva tudo automaticamente
    }
  )
);

export default useStore;