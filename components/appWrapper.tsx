import { useState, useEffect } from "react";
import {
  AppShell,
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import Header from "../components/header";
import { AuthWrapper } from "./authWrapper";
import DefaultTheme from "../styles/default.theme";
import { useThemeStore } from "../state/theme.state";

export default function AppWrapper({ children }: any) {
  const { colorScheme, setColorScheme } = useThemeStore();
  const [theme, setTheme] = useState<ColorScheme>(
    DefaultTheme.colorScheme as ColorScheme
  );

  const toggleColorScheme = () =>
    setColorScheme(colorScheme === "dark" ? "light" : "dark");

  useEffect(() => {
    setTheme(colorScheme);
  }, [colorScheme]);

  return (
    <ColorSchemeProvider
      colorScheme={theme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ ...DefaultTheme, colorScheme: theme }}
      >
        <AuthWrapper>
          <AppShell padding="md" header={<Header />}>
            {children}
          </AppShell>
        </AuthWrapper>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
