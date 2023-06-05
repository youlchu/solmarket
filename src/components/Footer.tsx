import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import {
  DiscordIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "assets/icons";
import { PropsWithChildren } from "react";
import { Logo } from "./common/Logo";
import { SubscribeForm } from "./PunksAndInfo/SubscribeForm";

export const Footer = () => {
  return (
    <SimpleGrid
      columns={{ base: 1, md: 3 }}
      spacing={10}
      padding={{ base: "0px 30px", md: "50px 115px" }}
      background="#3B3B3B"
    >
      <Box>
        <Logo />
        <MenuItem>NFT marketplace UI created with Anima for Figma.</MenuItem>
        <MenuItem>Join our community</MenuItem>
        <Box display={"flex"} gap="5px" marginTop="20px">
          <DiscordIcon />
          <YoutubeIcon />
          <TwitterIcon />
          <InstagramIcon />
        </Box>
      </Box>
      <Box>
        <MenuTitle>Explore</MenuTitle>
        <MenuItem>Marketplace</MenuItem>
        <MenuItem>Ranking</MenuItem>
        <MenuItem>Connect a wallet</MenuItem>
      </Box>
      <Box>
        <MenuTitle>Join Our Weekly Digest</MenuTitle>
        <MenuItem>
          Get exclusive promotions & updates straight to your inbox.
        </MenuItem>
        <Box marginTop="20px">
          <SubscribeForm />
        </Box>
      </Box>
    </SimpleGrid>
  );
};

const MenuTitle = (props: PropsWithChildren) => {
  const { children } = props;
  return (
    <Text
      fontSize="22px"
      mb="10px"
      color="white"
      marginBottom="33px"
      fontFamily="Space Mono"
      fontStyle="normal"
      fontWeight="thin"
    >
      {children}
    </Text>
  );
};

const MenuItem = (props: PropsWithChildren) => {
  const { children } = props;
  return (
    <Text fontSize="16px" mb="10px" color={"#CCCCCC"} marginTop="20px">
      {children}
    </Text>
  );
};
