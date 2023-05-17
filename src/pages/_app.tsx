import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

import { ChakraProvider } from "@chakra-ui/react";
import { dashboardTheme } from "@/theme";
import { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={dashboardTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  );
}
