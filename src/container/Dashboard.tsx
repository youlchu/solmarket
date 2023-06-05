/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import { Spinner } from "@chakra-ui/react";
import {
  Metaplex,
  bundlrStorage,
  walletAdapterIdentity,
  Metadata,
  NftWithToken,
} from "@metaplex-foundation/js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { MyNfts } from "components/Dashboard/MyNfts";
import { Title } from "components/common/Title";
import { useGetNFTs } from "hooks/useNFT";

import { DashboardLayout } from "layouts/Dashboard";
import { getNFTInformation } from "lib/nft";
import { useEffect, useMemo, useState } from "react";

export const DashboardContainer = () => {
  const { publicKey } = useWallet();
  const { data: nfts, isLoading } = useGetNFTs(
    {
      creator: publicKey?.toBase58(),
    },
    !!publicKey
  );

  return (
    <DashboardLayout>
      <Title prefixColor="blue.500">My NFTs</Title>
      {isLoading && <Spinner />}

      {!isLoading && <MyNfts nfts={nfts} />}
    </DashboardLayout>
  );
};
