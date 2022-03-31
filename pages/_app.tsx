import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen bg-red-500 pb-7">
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
