import {
  Container,
  Heading,
  Input,
  Text,
  Icon,
  InputGroup,
  Box,
  SimpleGrid,
  InputRightElement,
} from "@chakra-ui/react";
import { Header } from "components/Header";
import { FiSearch } from "react-icons/fi";

// import { discover } from "assets/data/users";
import { Footer } from "components/Footer";
import { useState } from "react";

import { OnSaleNFTCards } from "components/OnSaleNFT/OnSaleNFTCard";

import { OnSaleImage } from "assets/images";
import { useGetNFTs } from "hooks/useNFT";

export default function Marketplace() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const { data, isLoading, isError } = useGetNFTs({
    isForSale: true,
  });

  return (
    <>
      <Header />
      <Box
        width="100%"
        backgroundImage={OnSaleImage.src}
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
      >
        <Container
          color="white"
          padding={{ base: "0px 30px", md: "50px 115px" }}
          maxWidth="1400px"
        >
          <Box padding="80px 0px">
            <Heading fontSize="52px" lineHeight="110%">
              Solanamarket
            </Heading>
            <Text fontSize="22px" marginTop="10px">
              Umarım umduğun nft satıştadır.
            </Text>

            <InputGroup marginTop="49px">
              <Input
                placeholder=" Search your favourite NFTs"
                borderRadius="40px"
                borderColor="gray.600"
                padding="30px 10px"
              />
              <InputRightElement width="4.5rem" height="100%">
                <Icon as={FiSearch} fontSize="2xl" />
              </InputRightElement>
            </InputGroup>
          </Box>
        </Container>
      </Box>

      <Box marginBottom="80px">
        <Container
          color="white"
          // padding={{ base: "0px 30px", md: "50px 115px" }}
          padding="0px"
          maxWidth="100%"
        >
          {/* <Box
            padding="20px 0px"
            backgroundColor="#2B2B3B"
            borderTop="1px solid #858584"
          >
            <Text fontSize="22px" textAlign="center">
              NFTs({data?.length || 0})
            </Text>
          </Box> */}

          <Box padding={{ base: "0px 30px", md: "50px 115px" }}>
            <SimpleGrid
              gap="45px"
              rowGap="20px"
              templateColumns="repeat(auto-fill, minmax(380px, 1fr))"
              color="white"
            >
              {data?.map((nft: any) => {
                return (
                  <OnSaleNFTCards
                    key={nft.id}
                    item={nft}
                    background="#2B2B2B"
                  />
                );
              })}
            </SimpleGrid>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
