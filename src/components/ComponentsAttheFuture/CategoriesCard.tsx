import { Box, Image, Text } from "@chakra-ui/react";
import { User } from "assets/data/users";
import { CategoryPicture } from "assets/images";

interface Props {
  item: User;
}
export const CategoriesCard = ({ item }: Props) => {
  return (
    <>
      <Box
        marginTop="60px"
        color="white"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          background="#3B3B3B"
          borderBottomRadius="20px"
          borderTopRadius="25px"
        >
          <Image
            src={CategoryPicture.src}
            borderTopRadius="25px"
            width="100%"
          />
          <Text
            color="white"
            display="flex"
            justifyContent="center"
            fontSize="22px"
            alignItems="center"
            margin="15px"
          >
            {item.name}
          </Text>
        </Box>
      </Box>
    </>
  );
};
