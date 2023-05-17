import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { StepsTheme as Steps } from "chakra-ui-steps";

// theme.ts

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export const dashboardTheme = extendTheme({
  config,
  colors: {
    bg: {
      dark: "#111315",
    },
  },
  fonts: {
    body: `Rajdhani, sans-serif`,
  },
  components: {
    Steps,
  },
});
