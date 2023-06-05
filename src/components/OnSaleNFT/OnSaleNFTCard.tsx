/* eslint-disable jsx-a11y/alt-text */
import { Box, Text, Image, Button, Avatar, useToast } from "@chakra-ui/react";
import { DiscoverImage } from "assets/images";
import { Discover } from "assets/data/users";
import { AvatarIcon } from "assets/icons";
import { StarIcon } from "@chakra-ui/icons";
import { INFT } from "pages/api/get-nfts";
import { getGravatar } from "lib";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { createSaleTransferTx } from "lib/createTransferTokenTx";

interface Props {
  item: INFT;
  background?: string;
}
export const OnSaleNFTCards = ({ item }: Props) => {
  const anchorWallet = useAnchorWallet();
  const toast = useToast();

  const onSubmit = async (mintAddress: string) => {
    try {
      if (!anchorWallet) return;

      await createSaleTransferTx(anchorWallet, mintAddress);
      toast({
        title: "Success",
        description: "NFT Purchased",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.response?.data?.message || error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      background={"#3B3B3B"}
      borderRadius="20px"
      marginTop="50px"
      border="1px solid #A259FF"
      borderTopRadius="25px"
      width="100%"
    >
      <Box
        position="absolute"
        margin="20px"
        padding="8px"
        bg="#7FFF00"
        borderRadius="20px"
        color="gray.600"
        fontSize="18px"
        display="flex"
        alignItems="center"
      >
        <StarIcon marginRight="5px" /> {/* İkonu buraya ekledim */}
        OnSale
      </Box>
      <Image
        src={item.image}
        borderTopRadius="25px"
        width="100%"
        height="350px"
        objectFit="cover"
      />

      <Box
        color="white"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          width="90%"
          fontSize="22px"
          marginTop="20px"
          display="flex"
          justifyContent="space-between"
          marginBottom="25px"
        >
          <Text>{item.name}</Text>
          <Box display="flex" borderColor="purple" alignItems="center">
            <Avatar src={getGravatar(item.creator)} size="sm" />
            <Text
              marginLeft="8px"
              fontWeight="thin"
              fontSize="16px"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              maxWidth="80px" // Change this to your desired maximum width
            >
              {item.creator}
            </Text>
          </Box>
        </Box>
      </Box>
      <Box paddingX="20px" marginBottom="25px">
        <Text fontSize="16px" paddingBottom="20px" color="gray.400">
          {item.description}
        </Text>
        <Text paddingLeft="28px" color="#7FFF00" fontSize="20px">
          {item.price} SOL
        </Text>
      </Box>
      <Box display="flex" justifyContent="center" marginBottom="20px">
        <Button
          width="95%"
          letterSpacing="2px"
          border="1px solid #A259FF"
          onClick={() => onSubmit(item.mintAddress)}
        >
          Get Nft
        </Button>
      </Box>
    </Box>
  );
};
