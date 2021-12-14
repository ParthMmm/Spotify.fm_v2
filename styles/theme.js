import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config = {
  initialColorMode: "dark",
  // useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  textStyles: {
    t2: {
      fontSize: "xl",
      fontWeight: "600",
    },
  },
});
export default theme;
