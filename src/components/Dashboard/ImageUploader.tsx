// components/ImageUploader.tsx
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Text, VStack, Image, Button } from "@chakra-ui/react";

interface ImageUploaderProps {
  onChange: (file: File | null) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onChange }) => {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
        onChange(acceptedFiles[0]);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    noClick: !!file,
  });

  const removeImage = (event: React.MouseEvent) => {
    event.stopPropagation();
    setFile(null);
    onChange(null);
  };

  return (
    <VStack spacing={4} w="100%">
      <Box
        {...getRootProps()}
        border="2px dashed"
        borderColor={isDragActive ? "blue.300" : "gray.300"}
        borderRadius="md"
        p={4}
        textAlign="center"
        cursor="pointer"
        backgroundColor={isDragActive ? "blue.100" : "white"}
        width="100%"
        height="200px"
        position="relative"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bg="#111315"
      >
        <input {...getInputProps()} />
        {file ? (
          <>
            <Image
              src={URL.createObjectURL(file)}
              alt={file.name}
              boxSize="100%"
              objectFit="cover"
            />
            <Button
              size="sm"
              onClick={removeImage}
              position="absolute"
              bottom="5px"
              right="5px"
              bg="#111315"
            >
              Resmi Kaldır
            </Button>
          </>
        ) : (
          <Text
            fontWeight="bold"
            color={isDragActive ? "blue.600" : "gray.600"}
          >
            {isDragActive
              ? "Dosyaları buraya bırakın"
              : "Resimleri sürükleyip bırakarak veya tıklayarak yükleyin"}
          </Text>
        )}
      </Box>
    </VStack>
  );
};
