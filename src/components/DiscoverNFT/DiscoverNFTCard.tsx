/* eslint-disable jsx-a11y/alt-text */
import { Box, Text, Image, Avatar } from "@chakra-ui/react";
import { AvatarIcon } from "assets/icons";
import { getGravatar, sanitizeWalletAddress } from "lib";
import { INFT } from "pages/api/get-nfts";

interface Props {
  item: INFT;
  background?: string;
}
export const DiscoverNFTCard = ({ item, background }: Props) => {
  return (
    <Box
      background={background || "#3B3B3B"}
      borderRadius="20px"
      marginTop="10px"
      // paddingX="5px"
      paddingY="10px"
    >
      <Box
        margin="auto"
        width="80%"
        fontSize="22px"
        marginTop="20px"
        marginBottom="15px"
        display="flex"
        justifyContent="space-between"
      >
        <Box display="flex" borderColor="purple" alignItems="center">
          <Avatar src={getGravatar(item.creator)} size="sm" />
          <Text marginLeft="8px" fontWeight="thin" fontSize="16px">
            {sanitizeWalletAddress(item.creator)}
          </Text>
        </Box>
        <Text fontSize="16px" color="gray.300">
          {item.name}
        </Text>
      </Box>
      <Image
        src={item.image}
        borderRadius="8px"
        width="100%"
        height="350px"
        objectFit="cover"
      />
      <Box
        color="white"
        display="flex"
        justifyContent="center"
        alignItems="center"
      ></Box>
      <Box paddingX="15px" marginBottom="25px">
        <Text fontSize="16px" color="gray.400" marginTop="10px">
          {item.description}
        </Text>
      </Box>
    </Box>
  );
};
