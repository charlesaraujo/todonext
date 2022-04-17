import create from "zustand";
import { persist } from "zustand/middleware";
import DefaultTheme from "../styles/default.theme";
import { ColorScheme } from "@mantine/core";
type Store = {
  colorScheme: ColorScheme;
  setColorScheme: (colorScheme: ColorScheme) => void;
};

export const useThemeStore = create<Store>(
  persist<Store>(
    (set) => ({
      colorScheme: DefaultTheme.colorScheme as ColorScheme,
      setColorScheme: (colorScheme) => set({ colorScheme }),
    }),
    { name: "theme-store" }
  )
);
