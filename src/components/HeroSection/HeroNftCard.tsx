/* eslint-disable jsx-a11y/alt-text */
import { Avatar, Box, Image, Text } from "@chakra-ui/react";
import { AvatarIcon } from "assets/icons";
import { getGravatar } from "lib";
import React from "react";

type NftCardType = {
  imageSrc: string;
  username: string;
  nftName: string;
};

export const NftCard: React.FC<NftCardType> = ({
  imageSrc,
  username,
  nftName,
}) => {
  return (
    <Box color="white" width="100%" height="100%">
      <Image
        src={imageSrc}
        width="100%"
        minWidth={{ base: "100%", md: "100%" }}
        borderTopRadius="42px"
        height="500px"
        objectFit="cover"
      />
      <Box
        width="100%"
        padding="20px"
        marginTop="5px"
        bg="#3B3B3B"
        borderBottomRadius="30px"
      >
        <Text marginBottom="5px">{nftName}</Text>
        <Box display="flex">
          <Avatar src={getGravatar(username)} />
          <Text marginLeft="8px" fontWeight="thin">
            {username}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
