import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";

export const SubscribeForm = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type={show ? "text" : "password"}
        placeholder="Enter your email here"
        border="none"
        bg="#F7F7F7"
        borderRadius="30px"
        height="60px"
        width="420px"
      />
      <InputRightElement width="35%" height="100%">
        <Button
          size="sm"
          onClick={handleClick}
          bg="#A259FF"
          color="white"
          height="100%"
          width="100%"
          borderRadius="30px"
        >
          Subscribe
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};
