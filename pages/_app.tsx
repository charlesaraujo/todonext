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
import Script from "next/script";

// TODO adsense
// TODO Relacionamento user e todos
// TODO ordenar tarefas manualmente, e colocar tarafas done no final
// TODO melhorar light theme
// TODO adicionar pomodoro
// TODO Readme
// TODO github about
// TODO add capacitor
// TODO melhorias lighthouse webpagetest e pwabuilder
// TODO CSP header https://nextjs.org/docs/api-reference/next.config.js/headers

function MyApp({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    DefaultTheme.colorScheme as ColorScheme
  );

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <>
      <Script
        id="adsense"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4491598321720758"
        async
        crossOrigin="anonymous"
      />
      <script async crossOrigin="anonymous"></script>
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
    </>
  );
}

export default MyApp;
