/* eslint-disable jsx-a11y/alt-text */
import { Box, Button, Text, SimpleGrid, Avatar, Image } from "@chakra-ui/react";
import { AvatarIcon, RocketLaunch } from "assets/icons";
import { HeroImage } from "assets/images";
import { PropsWithChildren } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";

import { NftCard } from "./HeroNftCard";
import { sanitizeWalletAddress } from "lib";
import { INFT, INFTList } from "pages/api/get-nfts";
import { Autoplay } from "swiper";
import { useGetNFTs } from "hooks/useNFT";

export const HeroSection = () => {
  const { data, isLoading } = useGetNFTs({
    isHighlighted: true,
  });

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      gap="20px"
      margin="auto"
      paddingTop="20px"
      alignItems="center"
    >
      <Box color="white">
        <Text
          fontSize="53px"
          fontWeight={"500"}
          marginBottom="60px"
          lineHeight="1"
        >
          Solmarket monkey olmak ister misin ?
        </Text>
        <Text fontSize="22px" marginTop="20px">
          Bu NFT Marketplace solana blockchaini üzerinde çalışmaktadır.
          Oluşturduğunuz nftleri satışa çıkarabilir ve alabilirsiniz.
        </Text>{" "}
        <Button
          width={{ base: "100%", md: "auto" }}
          bg="#A259FF"
          borderRadius="0px"
          padding={"25px 50px"}
          marginTop="30px"
          marginBottom={"20px"}
        >
          <RocketLaunch />
          <Text marginLeft="10px">Get Started</Text>
        </Button>
        <SimpleGrid columns={{ base: 3, md: 2 }} spacing={10}>
          <Box>
            <CountBox>
              <Text color="purple">SolanaShot</Text>
            </CountBox>
            <Text>bir nevi instagram. paylaş</Text>
          </Box>
          <Box>
            <CountBox>
              <Text color="purple">SolMarket</Text>
            </CountBox>
            <Text>bir nevi amazon. satın al.</Text>
          </Box>
          <Box>
            <CountBox>
              {" "}
              <Text color="purple">NFTimer</Text>
            </CountBox>
            <Text>Sanatını yayınla. reklam yap</Text>
          </Box>
          <Box>
            <CountBox>
              {" "}
              <Text color="purple">SolanaPunks</Text>
            </CountBox>
            <Text>punkımız olmak iyi fikir</Text>
          </Box>
        </SimpleGrid>
      </Box>
      <Box w="100%" height="100%">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
        >
          {data?.map((nft: INFT, index: number) => (
            <SwiperSlide key={index}>
              <NftCard
                imageSrc={nft.image}
                username={sanitizeWalletAddress(nft.creator)}
                nftName={nft.name}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </SimpleGrid>
  );
};

const CountBox = (props: PropsWithChildren) => {
  const { children } = props;
  return <Text fontSize="28px">{children}</Text>;
};
