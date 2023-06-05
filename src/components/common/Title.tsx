import { Text } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export const Title = (
  props: PropsWithChildren<{
    prefixColor?: string;
  }>
) => {
  const { children } = props;
  return (
    <Text
      textTransform="uppercase"
      position="relative"
      paddingLeft="12px"
      fontWeight="600"
      fontSize="30px"
      _before={{
        content: '""',
        position: "absolute",
        top: "50%",
        left: "0",
        width: "2px",
        height: "100%",
        transform: "translateY(-50%)",
        borderRadius: "4px",
        background: props.prefixColor || "#B1E5FC",
      }}
    >
      {children}
    </Text>
  );
};
