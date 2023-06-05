import { CategoriesCard } from "./CategoriesCard";
import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { categories } from "assets/data/users";

export const Categories = () => {
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        color="white"
        marginTop="160px"
      >
        <Heading>Browse Categories</Heading>
      </Box>
      <SimpleGrid
        gap="30px"
        templateColumns="repeat(auto-fill, minmax(240px, 1fr))"
        color="white"
      >
        {categories.map((category) => {
          return <CategoriesCard key={category.id} item={category} />;
        })}
      </SimpleGrid>
    </>
  );
};
