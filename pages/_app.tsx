import type { AppProps } from "next/app";
import Script from "next/script";
import { SessionProvider } from "next-auth/react";
import AppWrapper from "../components/appWrapper";

// TODO ordenar tarefas manualmente, e colocar tarafas done no final https://github.com/SortableJS/Sortable
// TODO adicionar pomodoro
// TODO Readme
// TODO github about
// TODO add capacitor
// TODO melhorias lighthouse webpagetest e pwabuilder
// TODO adsense https://medium.com/nextjs/how-to-add-google-adsense-in-your-nextjs-89e439f74de3 https://www.npmjs.com/package/next-pwa
// TODO CSP header https://nextjs.org/docs/api-reference/next.config.js/headers
// TODO adicionar mais opções de login
// TODO colocar avatar do usuario
// TODO descobrir se usuario é novo e salvar os todos adicionados antes do login

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        id="adsense"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4491598321720758"
        crossOrigin="anonymous"
      />
      <SessionProvider session={pageProps.session}>
        <AppWrapper>
          <main>
            <Component {...pageProps} />
          </main>
        </AppWrapper>
      </SessionProvider>
    </>
  );
}

export default MyApp;
