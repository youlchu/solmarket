import React, { ReactNode, useCallback, useEffect } from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Button,
  Stack,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { FiMenu, FiChevronDown } from "react-icons/fi";
import { IconType } from "react-icons";
import { ReactText } from "react";

import NextLink from "next/link";
import { useRouter } from "next/router";

import { HEADER_HEIGHT, LEFT_SIDEBAR_WIDTH } from "assets/data/variables";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletConnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { getGravatar, sanitizeWalletAddress } from "lib";
import { Logo } from "components/Logo";

interface LinkItemProps {
  name: string;
  href?: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "My NFTS", href: "/dashboard" },
  { name: "Create NFT", href: "/dashboard/create-nft" },
  { name: "Settings", href: "/dashboard/settings" },
];

export const SidebarWithHeader = ({ children }: { children: ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      minH="100vh"
      bg={useColorModeValue("bg.dark", "#0F0E11")}
      color="white"
    >
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: LEFT_SIDEBAR_WIDTH }} p="4">
        {children}
      </Box>
    </Box>
  );
};

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <Box
      bg={useColorModeValue("bg.dark", "#0E0D10")}
      w={{ base: "full", md: LEFT_SIDEBAR_WIDTH }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        mx="8"
        justifyContent={{
          base: "space-between",
          md: "center",
        }}
      >
        <Link href="/" _hover={{ underline: "none" }}>
          <Logo />
        </Link>

        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Flex direction="column" gap="20px">
        {LinkItems.map((link, index) => (
          <NextLink
            href={link.href as string}
            key={index}
            onClick={() => setTimeout(() => onClose(), 1000)}
          >
            <NavItem
              as={"div"}
              key={link.name}
              icon={() => <></>}
              isActive={pathname === link.href}
              style={{
                background: pathname === link.href ? "#111011" : "transparent",
              }}
              _hover={{
                background: "#111011",
                color: "white",
              }}
            >
              {link.name}
            </NavItem>
          </NextLink>
        ))}
      </Flex>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  isActive: boolean;
  children: ReactText;
}
const NavItem = ({ icon, isActive, children, ...rest }: NavItemProps) => {
  return (
    <Box
      style={{
        textDecoration: "none",
        color: isActive ? "white" : "#6F767E",
        fontSize: "18px",
        fontWeight: "600",
        textTransform: "uppercase",
      }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        py="2"
        px="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="20px"
            fill={isActive ? "white" : "#6F767E"}
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const router = useRouter();

  const { publicKey, disconnect } = useWallet();

  return (
    <Flex
      ml={{ base: 0, md: LEFT_SIDEBAR_WIDTH }}
      px={{ base: 4, md: 4 }}
      height={HEADER_HEIGHT}
      alignItems="center"
      bg={useColorModeValue("bg.dark", "#0E0D10")}
      // borderBottomWidth="1px"
      // borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      boxShadow="inset 1px 0px 0px #121114, inset 0 -1px 0px #121114"
      borderBottom="1px solid #121114"
      gap="10px"
      // overflowX={}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      {!publicKey && <WalletMultiButton />}
      {publicKey && (
        <Flex alignItems={"center"} gap="10px">
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack
                background="#222222"
                // border="1px solid rgba(173, 170, 178, 0.2)"
                boxShadow="inset 0px 4px 4px rgba(0, 0, 0, 0.2);"
                padding="6px 12px"
                borderRadius="4px"
              >
                <Avatar size={"sm"} src={getGravatar(publicKey.toBase58())} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1"
                  ml="2"
                >
                  <Text fontSize="sm" fontWeight="bold">
                    {sanitizeWalletAddress(publicKey.toBase58())}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg="bg.dark"
              borderColor="#272B30"
              padding="12px 16px 20px"
              borderRadius="8px"
              zIndex="3"
            >
              <MenuItem
                background="transparent"
                fontSize="15px"
                fontWeight="600"
                // onClick={() => accountPopup.onOpen()}
              >
                Account
              </MenuItem>

              <MenuDivider />
              <MenuItem background="transparent" onClick={disconnect}>
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      )}
    </Flex>
  );
};
