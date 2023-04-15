import "../styles/globals.css";
import type { AppProps } from "next/app";

import { Provider } from "jotai";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { DevTools } from "jotai-devtools";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        {/* <DevTools /> */}
        <Component {...pageProps} />
      </Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
