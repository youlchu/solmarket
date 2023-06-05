import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { INFTQueryFilter } from "pages/api/get-nfts";
import { useMutation, useQuery } from "react-query";

type UpdateNFTInput = {
  address: string;
  publicKey: string;
  price: number;
};

export const useUpdateNFT = () => {
  const toast = useToast();

  return useMutation(
    async (prompt: UpdateNFTInput) => {
      return (await axios.post(`/api/update-nft`, prompt)).data;
    },
    {
      onSuccess: (data) => {
        toast({
          title: "NFT Updated",
          description: "Your NFT has been updated!",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      },
    }
  );
};

export type CreateNFTInput = {
  address: string;
  price: number;
  description: string;
};

export const useSaveNFT = () => {
  const toast = useToast();

  return useMutation(
    async (prompt: CreateNFTInput) => {
      return (await axios.post(`/api/create-nft`, prompt)).data;
    },
    {
      onSuccess: (data) => {
        toast({
          title: "NFT Saved",
          description: "Your NFT has been saved!",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      },
    }
  );
};

export const useTransferToken = () => {
  const toast = useToast();

  return useMutation(
    async (prompt: UpdateNFTInput) => {
      return (await axios.post(`/api/create-nft-transfer`, prompt)).data;
    },
    {
      onSuccess: (data) => {
        toast({
          title: "NFT Transferred",
          description: "Your NFT has been transferred!",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      },
    }
  );
};

export const useGetNFTs = (query: INFTQueryFilter, enabled: boolean = true) => {
  const toast = useToast();

  return useQuery(
    ["get-nfts", JSON.stringify(query)],
    async () => {
      return (
        await axios.get(`/api/get-nfts`, {
          params: query,
        })
      ).data;
    },
    {
      onSuccess: () => {
        console.log("success");
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: `Error loading NFTs: e}`,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      },
      enabled: query.creator ? true : enabled,
    }
  );
};

export const useUnlistNFT = () => {
  const toast = useToast();

  return useMutation(
    async (mintAddress: string) => {
      return (await axios.post(`/api/unlist-nft`, { mintAddress })).data;
    },
    {
      onSuccess: (data) => {
        toast({
          title: "NFT Unlisted",
          description: "Your NFT has been unlisted!",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      },
    }
  );
};
