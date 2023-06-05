import { Box, Heading } from "@chakra-ui/layout";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useController, useFormContext } from "react-hook-form";
import { GiMoneyStack, GiReceiveMoney } from "react-icons/gi";
import * as yup from "yup";
import { ErrorMessage, FormValues } from "..";
import { ChangeEvent } from "react";

export const Step1Schema = yup.object().shape({
  information: yup.object().shape({
    name: yup.string().required("This value is required."),
    symbol: yup.string().required("This value is required."),
    description: yup.string().optional(),
  }),
});

// const options = [
//   { label: "Refinance", value: "refinance", icon: GiReceiveMoney },
//   { label: "Buy a home", value: "buy-a-home", icon: GiMoneyStack },
// ];

export const Step1 = () => {
  const { control } = useFormContext<FormValues>();

  const {
    field: { value, onChange },
    formState: { errors },
  } = useController({
    name: "information",
    control,
  });

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, name: e.target.value });
  };

  const handleSymbolChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, symbol: e.target.value });
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, description: e.target.value });
  };

  return (
    <Box
      sx={{
        mb: 8,
        display: "flex",
        flexDir: "column",
        alignItems: "center",
      }}
    >
      <Heading size="lg" sx={{ mt: 8 }}>
        Öncelikle şu bilgileri almam gerekiyor!
      </Heading>
      <FormControl isRequired>
        <FormLabel mt={4}>NFT Name</FormLabel>
        <Input
          placeholder="Find a wonderfully unique name for your NFT"
          value={value.name || ""}
          onChange={handleNameChange}
        />
        {errors.information?.name && (
          <ErrorMessage message={errors.information.name.message || ""} />
        )}
      </FormControl>
      <FormControl isRequired>
        <FormLabel mt={4}>NFT Symbol</FormLabel>
        <Input
          placeholder="SB"
          value={value.symbol || ""}
          onChange={handleSymbolChange}
        />
        {errors.information?.symbol && (
          <ErrorMessage message={errors.information.symbol.message || ""} />
        )}
      </FormControl>
      <FormControl>
        <FormLabel mt={4}>NFT Description</FormLabel>
        <Input
          placeholder="This is NFT description"
          value={value.description || ""}
          onChange={handleDescriptionChange}
        />
        {errors.information?.description && (
          <ErrorMessage
            message={errors.information?.description.message || ""}
          />
        )}
      </FormControl>
    </Box>
  );
};
