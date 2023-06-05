import { Box, Button, Heading, Text, SimpleGrid } from "@chakra-ui/react";
import { RocketLaunch } from "assets/icons";
import { UserListComponent } from "./UserListComponent";
import { users } from "assets/data/users";

export const UsersList = () => {
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        color="white"
        marginTop="80px"
      >
        <Box>
          <Heading>Top Creator</Heading>
          <Text>Checkout Top Rated Creators on the NFT Marketplace</Text>
        </Box>
        <Button bg="#2B2B2B" borderColor="red">
          <RocketLaunch />
          <Text marginLeft="10px">View Ranking</Text>
        </Button>
      </Box>
      <SimpleGrid
        gap="30px"
        marginTop="60px"
        templateColumns="repeat(auto-fill, minmax(240px, 1fr))"
        color="white"
      >
        {users.map((user) => {
          return <UserListComponent key={user.id} item={user} />;
        })}
      </SimpleGrid>
    </>
  );
};
