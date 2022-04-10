import type { AppProps } from "next/app";
import { useState } from "react";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { SessionProvider } from "next-auth/react";
import DefaultTheme from "../styles/default.theme";
import Header from "../components/header";
import { AuthWrapper } from "../components/authWrapper";

// TODO Relacionamento user e todos
// TODO Proteger API de todos
// TODO PWA
// TODO lighthouse 100
// TODO ordenar tarefas manualmente, e colocar tarafas done no final
// TODO melhorar light theme
// TODO adicionar pomodoro
// TODO criar favicon

function MyApp({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    DefaultTheme.colorScheme as ColorScheme
  );

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ ...DefaultTheme, colorScheme }}
      >
        <SessionProvider session={pageProps.session}>
          <AuthWrapper>
            <Header />
            <main>
              <Component {...pageProps} />
            </main>
          </AuthWrapper>
        </SessionProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default MyApp;
