import { Box, Text, Image } from "@chakra-ui/react";
import { UserProfilePicture } from "assets/images";
import { User } from "assets/data/users";
interface Props {
  item: User;
}
export const UserListComponent = ({ item }: Props) => {
  return (
    <>
      <Box background="#3B3B3B" borderRadius="20px">
        <Box
          color="white"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box>
            <Image
              src={UserProfilePicture.src}
              borderRadius="60px"
              marginTop="20px"
              width="100%"
            ></Image>
            <Text
              color="white"
              display="flex"
              justifyContent="center"
              alignItems="center"
              marginTop="20px"
            >
              {item.name}
            </Text>
          </Box>
        </Box>
        <Box
          color="white"
          display="flex"
          justifyContent="center"
          alignItems="center"
          fontSize="16px"
        >
          <Text marginRight="10px" marginTop="5px" color="#858584">
            Total Sales:
          </Text>
          <Text>30 SOL</Text>
        </Box>
      </Box>
    </>
  );
};
