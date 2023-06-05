import { Box, Button, Heading, Text, SimpleGrid } from '@chakra-ui/react';
import { Seeall } from 'assets/icons';
import { OnSaleNFTCards } from './OnSaleNFTCard';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { useGetNFTs } from 'hooks/useNFT';
import { INFT } from 'pages/api/get-nfts';

export const OnSaleNFTs = () => {
  const { data } = useGetNFTs({
    isForSale: true,
  });

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
          <Heading fontWeight="bold" marginBottom="50px" letterSpacing="2px" color="#A259FF">
            Onsale NFTs on SolMarketPlace
          </Heading>
          <Text fontSize="20px">Search Nfts to buy</Text>
        </Box>
        <Link href="/marketplace">
          <Box
            borderColor="red"
            fontSize="16px"
            fontWeight={600}
            color={'white'}
            bg={'#A259FF'}
            padding="20px 30px"
            borderRadius="30px"
            _hover={{
              bg: '#A259FF',
            }}
          >
            <Text>Go to market</Text>
          </Box>
        </Link>
      </Box>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        autoplay={{
          delay: 300,
          disableOnInteraction: false,
        }}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
      >
        {data?.slice(0, 4).map((nft: INFT) => (
          <SwiperSlide key={nft.id}>
            <OnSaleNFTCards item={nft} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
