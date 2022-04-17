import type { AppProps } from "next/app";
import Script from "next/script";
import { useState, useEffect } from "react";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { SessionProvider } from "next-auth/react";
import DefaultTheme from "../styles/default.theme";
import { useThemeStore } from "../state/theme.state";
import Header from "../components/header";
import { AuthWrapper } from "../components/authWrapper";

// TODO Relacionamento user e todos
// TODO Add turbo repo nesse repositorio? https://turborepo.org/
// TODO ordenar tarefas manualmente, e colocar tarafas done no final https://github.com/SortableJS/Sortable
// TODO adicionar pomodoro
// TODO Readme
// TODO github about
// TODO add capacitor
// TODO melhorias lighthouse webpagetest e pwabuilder
// TODO adsense https://medium.com/nextjs/how-to-add-google-adsense-in-your-nextjs-89e439f74de3
// TODO CSP header https://nextjs.org/docs/api-reference/next.config.js/headers
// TODO Margem botton todo page

function MyApp({ Component, pageProps }: AppProps) {
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
    <>
      <Script
        id="adsense"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4491598321720758"
        crossOrigin="anonymous"
      />
      {/* <Script
        id="Adsense-id"
        data-ad-client="ca-pub-4491598321720758"
        async={true}
        onError={(e) => {
          console.error("AdSense Script failed to load", e);
        }}
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      /> */}
      <ColorSchemeProvider
        colorScheme={theme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ ...DefaultTheme, colorScheme: theme }}
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
