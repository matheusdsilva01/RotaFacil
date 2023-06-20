import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import { ToastContainer } from "react-toastify";

import Header from "@/components/header";
import { CssBaseline } from "@mui/material";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Rota Facil</title>
        <meta property="og:title" content="Rota Facil" key="title" />
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <Header />
      <CssBaseline />
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}
