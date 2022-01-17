import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Footer from "../components/custom-comp/Footer/Footer";
import Header from "../components/custom-comp/Header/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
