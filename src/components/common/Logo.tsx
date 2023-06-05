import { Box, Text } from "@chakra-ui/react";
import { LogoIcon } from "assets/icons";

export const Logo = () => {
  return (
    <Box display="flex" gap="10px" alignItems="center">
      <LogoIcon />
      <Text fontSize="18px" color="white">
        SolMarket.place
      </Text>
    </Box>
  );
};
