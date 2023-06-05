import { Box, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { AvatarIcon } from "assets/icons";
import { CollectionCardImage } from "assets/images";

export const CollectionCard = () => {
  return (
    <>
      <Box color="white" marginBottom="80px">
        <Image src={CollectionCardImage.src} borderRadius="40px" width="100%" />
        <SimpleGrid columns={{ base: 3, md: 3 }} gap="15px" marginTop="15px">
          <Image
            src={CollectionCardImage.src}
            width="100%"
            borderRadius="30px"
          />
          <Image
            src={CollectionCardImage.src}
            width="100%"
            borderRadius="30px"
          />
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            background="#A259FF"
            borderRadius="30px"
            fontFamily="space mono"
            fontSize="22px"
          >
            1000+
          </Box>
        </SimpleGrid>
        <Box width="100%" marginTop="5px">
          <Text marginBottom="5px">Tolga Çağlayan Yolcu</Text>
          <Box display="flex" borderColor="purple">
            <AvatarIcon />
            <Text marginLeft="8px" fontWeight="thin">
              Animakid
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
};
