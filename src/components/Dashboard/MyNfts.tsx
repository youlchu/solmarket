import { Box, SimpleGrid, Spinner } from "@chakra-ui/react";
import { NftCard } from "./NftCard";
import { INFT } from "pages/api/get-nfts";

interface MyNftsProps {
  nfts: INFT[];
}

export const MyNfts: React.FC<MyNftsProps> = ({ nfts }) => {
  return (
    <Box>
      <SimpleGrid
        marginTop="50px"
        templateColumns={{
          base: "repeat(2, minmax(0, 390px))",
          sm: "repeat(2, minmax(0, 390px))",
          md: "repeat(3, minmax(0, 960px))",
        }}
        spacing={4}
      >
        {nfts?.map((nft: INFT, index) => (
          <Box key={index}>
            <NftCard
              name={nft.name}
              imageUrl={nft.image}
              mintAddress={nft.mintAddress}
              isForSale={nft.isForSale}
            />
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};
