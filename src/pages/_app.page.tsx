import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import type { AppProps } from "next/app";
import Head from "next/head";

import Header from "@/components/header";
import { CssBaseline } from "@mui/material";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Rota Facil</title>
        <meta property="og:title" content="My page title" key="title" />
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <Header />
      <CssBaseline />
      <Component {...pageProps} />
    </>
  );
}
