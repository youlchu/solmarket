import {
  Box,
  Button,
  Heading,
  Text,
  SimpleGrid,
  Container,
} from "@chakra-ui/react";
import styled from "@emotion/styled";

import { Seeall } from "assets/icons";
import { DiscoverNFTCard } from "./DiscoverNFTCard";
import Link from "next/link";
import { DiscoverBg } from "assets/images";
import { useGetNFTs } from "hooks/useNFT";

// import global css

export const DiscoverNft = () => {
  const { data } = useGetNFTs({});

  const StyledBox = styled(Box)`
    background-image: url(${DiscoverBg.src});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    text-align: start;
    height: 840px;
  `;

  const randomNFT = data ? data[Math.floor(Math.random() * data.length)] : null;
  return (
    <>
      <StyledBox>
        <Box
          padding={{ base: "0px 30px", md: "50px 25px" }}
          maxWidth="1400px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          color="white"
          marginTop="80px"
        >
          <Box
            width="100%"
            padding="20px 0px"
            display="flex"
            justifyContent="center"
          >
            <Box>
              <Heading letterSpacing="5px">Discover More NFTs</Heading>
              <Text>Explore More NFTs</Text>
            </Box>
          </Box>
          <Link href="/browse">
            <Button padding="30px" bg="#2B2B2B" borderColor="red">
              <Seeall />
              <Text marginLeft="10px">See All</Text>
            </Button>
          </Link>
        </Box>
        <SimpleGrid
          gap="5px"
          padding={{ base: "0px 30px", md: "40px 315px" }}
          maxWidth="1400px"
          templateColumns="repeat(auto-fill, minmax(340px, 1fr))"
          color="white"
        >
          {randomNFT && (
            <div className="animated-nft">
              <DiscoverNFTCard key={randomNFT.id} item={randomNFT} />
            </div>
          )}
        </SimpleGrid>
      </StyledBox>
    </>
  );
};
