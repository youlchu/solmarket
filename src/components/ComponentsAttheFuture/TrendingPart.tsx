import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { CollectionCard } from "./CollectionCard";

export const TrendingPart = () => {
  return (
    <>
      <Box>
        <Text fontSize="38px" color="white" marginTop="80px">
          Trending Colections
        </Text>
        <Text
          fontSize="22px"
          color="white"
          fontWeight="thin"
          marginBottom="50px"
        >
          Checkout our weekly updated trending collection.
        </Text>
        <SimpleGrid
          gap="30px"
          templateColumns="repeat(auto-fill, minmax(330px, 1fr))"
        >
          <CollectionCard />
          <CollectionCard />
          <CollectionCard />
        </SimpleGrid>
      </Box>
    </>
  );
};
