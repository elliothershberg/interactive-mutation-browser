import "../styles/globals.css";
import type { AppProps } from "next/app";

import { Provider } from "jotai";
import { DevTools } from "jotai-devtools";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <DevTools />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
