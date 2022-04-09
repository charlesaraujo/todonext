import type { AppProps } from "next/app";
import { useState } from "react";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import DefaultTheme from "../styles/default.theme";
import Header from "../components/header";

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
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default MyApp;
