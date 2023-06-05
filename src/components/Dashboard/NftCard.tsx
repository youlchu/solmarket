import {
  Box,
  Text,
  Image,
  Flex,
  IconButton,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { useTransferToken, useUnlistNFT, useUpdateNFT } from "hooks/useNFT";
import { createTokenTransferTx } from "lib/createTransferTokenTx";
import { FC, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { useQueryClient } from "react-query";

interface NftCardProps {
  mintAddress: string;
  name: string;
  imageUrl?: string;
  isForSale?: boolean;
}

export const NftCard: FC<NftCardProps> = ({
  name,
  imageUrl,
  mintAddress,
  isForSale,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [price, setPrice] = useState<string>("0");
  const queryClient = useQueryClient();
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);

  const wallet = useAnchorWallet();

  const { data, mutateAsync } = useUnlistNFT();

  const handleSubmit = async () => {
    if (!wallet || !wallet.publicKey) return;

    try {
      setIsSubmitLoading(true);
      await createTokenTransferTx(wallet, mintAddress, Number(price));
      queryClient.invalidateQueries(["get-nfts"]);
      onClose();
    } catch (error) {
    } finally {
      setIsSubmitLoading(false);
    }
  };

  const handleRemoveFromSale = async () => {
    await mutateAsync(mintAddress);
    queryClient.invalidateQueries(["get-nfts"]);
  };
  return (
    <Box
      w="full"
      borderWidth="4px"
      borderRadius="md"
      overflow="hidden"
      borderColor="black"
    >
      <Box position="relative">
        <Image src={imageUrl} alt={name} w="full" h="300px" objectFit="cover" />
        {isForSale && (
          <Text
            position="absolute"
            top="2"
            right="2"
            bg="green.500"
            borderRadius="md"
            px="2"
            py="1"
            fontSize="sm"
            color="white"
            zIndex="1"
          >
            Satışta
          </Text>
        )}
      </Box>

      <Box px="4" py="2" bg="gray.900" color="white">
        <Flex flexDirection="column">
          <Button variant="unstyled" fontWeight="bold">
            {name}
          </Button>
          <Box width="100%">
            {!isForSale && (
              <Button
                aria-label="Satışa Çıkar"
                variant="ghost"
                colorScheme="teal"
                _hover={{ underline: "none" }}
                border="1px"
                mr={2}
                onClick={onOpen}
                width="100%"
              >
                Satışa Çıkar
              </Button>
            )}

            {isForSale && (
              <Button
                aria-label="Satıştan Çıkar"
                variant="ghost"
                colorScheme="red"
                _hover={{ underline: "none" }}
                border="1px"
                mr={2}
                onClick={handleRemoveFromSale}
                width="100%"
              >
                Satıştan Çıkar
              </Button>
            )}
          </Box>
        </Flex>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="bg.dark" color="white">
          <ModalHeader>Satışa Çıkar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Fiyat</FormLabel>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                _focus={{ borderColor: "teal.500" }}
                isDisabled={isSubmitLoading}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="teal"
              mr={3}
              onClick={handleSubmit}
              isLoading={isSubmitLoading}
            >
              Gönder
            </Button>
            <Button variant="ghost" onClick={onClose}>
              İptal
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
