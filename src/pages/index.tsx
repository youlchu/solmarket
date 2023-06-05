import { Box, Container } from "@chakra-ui/react";

import { Header } from "components/Header";
import { Footer } from "components/Footer";
import { HeroSection } from "components/HeroSection";
import { NftHighlight } from "components/PunksAndInfo/NftHighlight";
import { Information } from "components/PunksAndInfo/Information";
import { Weakly } from "components/PunksAndInfo/Weakly";
import { DiscoverNft } from "components/DiscoverNFT/DiscoverNft";

import { OnSaleNFTs } from "components/OnSaleNFT/OnSaleNFTs";

export default function Home() {
  return (
    <Box bg="#2B2B2B" fontFamily="Work Sans, sans-serif">
      <Header />
      <Container
        height="100%"
        padding={{ base: "0px 30px", md: "200px 115px 65px 0 " }}
        maxWidth="1400px"
      >
        <HeroSection />
      </Container>
      <Box id="solanashot" paddingTop="27px">
        <DiscoverNft />
      </Box>

      <Box id="solanamarket">
        <Container
          padding={{ base: "0px 30px", md: "50px 115px" }}
          maxWidth="1400px"
        >
          {/* <TrendingPart /> */}
          {/* <UsersList /> */}
          {/* <Categories /> */}
          <OnSaleNFTs />
        </Container>
      </Box>
      <Box id="nftimer" paddingTop="38px">
        <NftHighlight />
      </Box>

      <Container
        padding={{ base: "0px 30px", md: "50px 115px" }}
        maxWidth="1400px"
      >
        <Box id="solmarket-monkey-business" paddingY="24px">
          <Information />
        </Box>
        <Box id="solanapunks" paddingY="40px">
          <Weakly />
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}
