import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useGenerateImage } from "hooks/useGenerateImage";
import { useState } from "react";

export type SelectImageProps = {
  onChange(image: string): void;
};

export const SelectFromAI = (props: SelectImageProps) => {
  const [magicWords, setMagicWords] = useState("");
  const { isLoading, mutateAsync, data } = useGenerateImage();
  const { onChange } = props;

  const onSubmit = async () => {
    const { imageUri } = await mutateAsync(magicWords);
    onChange(imageUri);
  };

  return (
    <Flex mt="10px">
      <FormControl isRequired>
        <FormLabel>Your magic words</FormLabel>
        <Input
          placeholder="dog reading book"
          value={magicWords}
          onChange={(e) => setMagicWords(e.target.value)}
          disabled={isLoading}
        />
        <Button mt="10px" width="100%" isLoading={isLoading} onClick={onSubmit}>
          Oluştur!
        </Button>
        {data?.imageUri && (
          <Box marginTop="20px">
            <img src={data.imageUri} height="300px" width="300px" />
          </Box>
        )}
      </FormControl>
    </Flex>
  );
};
