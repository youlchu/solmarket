import {
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { FormProvider, useForm } from "react-hook-form";
import { GiRocketFlight } from "react-icons/gi";
import { Step1, Step1Schema } from "./Steps/Step1";
import { Step2, Step2Schema } from "./Steps/Step2";
import { Step3, Step3Schema } from "./Steps/Step3";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useMemo, useState } from "react";
import { CreateNFTStep, CreateNFTStepDescription } from "assets/data/variables";
import {
  Metaplex,
  bundlrStorage,
  toMetaplexFile,
  toMetaplexFileFromBrowser,
  walletAdapterIdentity,
} from "@metaplex-foundation/js";
import { getImageFromUri } from "lib";
import { Transaction } from "@solana/web3.js";

import NextLink from "next/link";
import { useBase64Image } from "hooks/useBase64Image";
import { useSaveNFT } from "hooks/useNFT";

const steps = [
  {
    label: "NFT Information",
    description: "Fill information",
    content: <Step1 />,
  },
  { label: "NFT Image", description: "Select Image", content: <Step2 /> },
  { label: "Result", description: "Result", content: <Step3 /> },
];

const INITIAL_VALUES = {
  information: {
    name: "",
    symbol: "",
    description: "",
  },
  imageType: "",
  image: "", // Change this line
  price: 0,
  goal: "",
};

export type FormValues = {
  information: {
    name: string;
    symbol: string;
    description: string;
  };
  imageType: string;
  image: File | string; // Change this line
  price: number;
  goal: string;
};

const schemaArr = [Step1Schema, Step2Schema, Step3Schema];

export const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <Box
      sx={{
        p: 2,
        rounded: "md",
        boxShadow: "sm",
        bg: useColorModeValue("gray.50", "gray.800"),
      }}
    >
      <Text fontSize="md" color="red.400" fontWeight={"bold"}>
        {message}
      </Text>
    </Box>
  );
};

export const ReactHookFormExample = ({
  variant,
}: {
  variant: "circles" | "circles-alt" | "simple" | undefined;
}) => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const convertImage = useBase64Image();

  const [step, setStep] = useState<CreateNFTStep>(CreateNFTStep.IDLE);
  const saveNFT = useSaveNFT();

  const metaplex = useMemo(
    () =>
      Metaplex.make(connection)
        .use(walletAdapterIdentity(wallet))
        .use(
          bundlrStorage({
            address: "https://devnet.bundlr.network",
            providerUrl: "https://api.devnet.solana.com",
            timeout: 60000,
          })
        ),
    [connection, wallet]
  );

  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  const methods = useForm<FormValues>({
    resolver: yupResolver(schemaArr[activeStep]),
    defaultValues: INITIAL_VALUES,
  });

  const { handleSubmit } = methods;

  const onSubmit = async () => {
    if (activeStep === steps.length - 1) {
      if (!wallet || !wallet.publicKey) throw new Error("Wallet not connected");
      nextStep();

      console.log(methods.getValues("image"));

      const name = methods.getValues("information").name;
      const symbol = methods.getValues("information").symbol;

      let image;

      if (methods.getValues("imageType") === "select-from-ai") {
        const imageUri = methods.getValues("image") as string;
        // const response = await convertImage.mutateAsync(imageUri);

        const imageBuffer = await getImageFromUri(imageUri);

        image = toMetaplexFile(imageBuffer, "image.png");
      } else {
        image = await toMetaplexFileFromBrowser(
          methods.getValues("image") as File
        );
      }

      setStep(CreateNFTStep.UPLOADING_METADATA);
      const { uri, metadata } = await metaplex.nfts().uploadMetadata({
        name,
        symbol,
        image,
        properties: {
          files: [
            {
              type: "image/jpeg",
              uri: image,
            },
          ],
        },
      });
      setStep(CreateNFTStep.UPLOADED_METADATA);

      console.log(image);

      const updateAuthoritySigner = {
        publicKey: wallet.publicKey,
        signTransaction: async (transaction: Transaction) => {
          if (!wallet.signTransaction) {
            throw new Error("Wallet does not have a signTransaction method");
          }
          return wallet.signTransaction(transaction);
        },
        signMessage: async (message: Uint8Array) => {
          if (!wallet.signMessage) {
            throw new Error("Wallet does not have a signMessage method");
          }
          return wallet.signMessage(message);
        },
        signAllTransactions: async (transactions: Transaction[]) => {
          if (!wallet.signAllTransactions) {
            throw new Error(
              "Wallet does not have a signAllTransactions method"
            );
          }
          return wallet.signAllTransactions(transactions);
        },
      };

      //upload nft
      setStep(CreateNFTStep.CREATING_NFT);
      const { nft } = await metaplex.nfts().create({
        uri,
        name: metadata.name as string,
        sellerFeeBasisPoints: 500,
        updateAuthority: updateAuthoritySigner,
        mintAuthority: updateAuthoritySigner,
      });
      setStep(CreateNFTStep.CREATED_NFT);

      saveNFT.mutateAsync({
        address: nft.mint.address.toBase58(),
        price: methods.getValues("price"),
        description: methods.getValues("information").description,
      });
    } else nextStep();
  };

  const bg = useColorModeValue("gray.50", "gray.800");

  const handleReset = () => {
    reset();
    methods.reset();
  };

  return (
    <Box sx={{ mt: 8 }} maxWidth="container.lg">
      <FormProvider {...methods}>
        <Steps variant={variant} activeStep={activeStep} colorScheme="blue">
          {steps.map(({ label, content, description }) => (
            <Step label={label} key={label} description={description}>
              {content}
            </Step>
          ))}
        </Steps>
      </FormProvider>
      {activeStep === steps.length ? (
        <Flex p={4} sx={{ flexDir: "column", alignItems: "center" }}>
          <Box sx={{ p: 8 }}>
            {step === CreateNFTStep.CREATED_NFT ? (
              <GiRocketFlight size={64} />
            ) : (
              <Spinner size="xl" />
            )}
          </Box>
          <Heading>
            {step === CreateNFTStep.CREATED_NFT
              ? "Tadaaa! NFT'in oluşturuldu!"
              : "NFT'in oluşturuluyor!!"}
          </Heading>
          <Box sx={{ mb: 8, mt: 4 }}>
            <Text fontSize="22px" color="purple">
              Bu biraz sürecek. Arkana yaslan andan keyif al !
            </Text>
            <Text>
              {CreateNFTStepDescription[step]} - Current Step Index: {step + 1}{" "}
              / {Object.keys(CreateNFTStep).length}
            </Text>
          </Box>
          <Flex gap="20px">
            <Button mx="auto" onClick={() => handleReset()}>
              Yeniden oluştur
            </Button>
            <Button as={NextLink} href="">
              NFTlerimi görüntüle
            </Button>
          </Flex>
        </Flex>
      ) : (
        <Flex width="100%" justify="center">
          <Button
            isDisabled={activeStep === 0}
            mr={4}
            onClick={prevStep}
            variant="ghost"
          >
            Prev
          </Button>
          <Button onClick={() => handleSubmit(onSubmit)()} type="submit">
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Flex>
      )}
      {/* <Box as="pre" bg={bg} rounded="md" width="100%" p={4} mt={8}>
        <code>{JSON.stringify(methods.watch(), null, 2)}</code>
      </Box> */}
    </Box>
  );
};
