import { Box, Text, Image, SimpleGrid } from "@chakra-ui/react";
import { WeaklyImage } from "assets/images";
import { SubscribeForm } from "./SubscribeForm";

export const Weakly = () => {
  return (
    <Box
      background="#3B3B3B"
      padding="60px"
      marginTop="120px"
      marginBottom="80px"
      borderRadius="20px"
    >
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} color="white">
        <Image src={WeaklyImage.src} borderRadius="25px"></Image>
        <Box>
          <Text fontSize="38px" marginBottom="16px">
            Email gir Solana Punk ol.
          </Text>
          <Text fontSize="22px">
            Her türlü organizsyon ve yeniliklerden haberdar olmak için emailini
            girebilirsin.
          </Text>
          <Box marginTop="40px">
            <SubscribeForm />
          </Box>
        </Box>
      </SimpleGrid>
    </Box>
  );
};
