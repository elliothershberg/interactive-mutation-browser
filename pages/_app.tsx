import "../styles/globals.css";
import type { AppProps } from "next/app";

import { Provider } from "jotai";

function MyApp({ Component, pageProps }: AppProps) {
  return;
  <Provider>
    <Component {...pageProps} />
  </Provider>;
}

export default MyApp;
