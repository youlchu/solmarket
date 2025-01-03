import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { Logo } from "./common/Logo";

import { useRouter } from "next/router";
import RouterLink from "next/link";

export const Header = () => {
  const { isOpen, onToggle } = useDisclosure();
  const router = useRouter();

  return (
    <Box>
      <Flex
        bg="#2B2B2B"
        position="fixed"
        width="100%"
        color="white"
        borderBottomRadius="40px"
        py={{ base: "9px" }}
        px={{ base: "50px" }}
        align={"center"}
        zIndex="100"
      >
        <Flex flex={{ base: 1 }} justify={{ base: "start" }}>
          <Link
            as={RouterLink}
            href="/"
            _hover={{
              textDecoration: "none",
            }}
          >
            <Logo />
          </Link>
        </Flex>

        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
          justify="flex-end"
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Stack justify={"flex-end"} direction={"row"} spacing={6}>
          <Flex display={{ base: "none", md: "flex" }}>
            <DesktopNav />
          </Flex>
          <Button
            as={RouterLink}
            href="/dashboard"
            display={{ base: "none", md: "inline-flex" }}
            fontSize="16px"
            fontWeight={600}
            color={"white"}
            bg={
              router.pathname === "/marketplace"
                ? "rgba(255, 255, 255, 0.08)"
                : "#A259FF"
            }
            padding="30px 30px"
            borderRadius="30px"
            _hover={{
              bg: "#    bg: router.pathname === '/marketplace' ? '' : '#A259FF',",
            }}
          >
            Dashboard
          </Button>
        </Stack>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
};

const DesktopNav = () => {
  const linkColor = "white";
  const linkHoverColor = "purple.400";

  return (
    <Stack
      direction={"row"}
      gap={{ base: "0px", lg: "50px" }}
      alignItems="center"
    >
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                fontSize="16px"
                fontWeight={600}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                // bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack bg="#2B2B2B" p={4} display={{ md: "none" }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text color="white">{label}</Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor="white"
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

// onClick={() => document.getElementById("mySection").scrollIntoView({ behavior: "smooth" })}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Solanashot",
    href: "#solanashot",
  },
  {
    label: "Solanamarket",
    href: "#solanamarket",
  },
  {
    label: "NFTimer",
    href: "#nftimer",
  },
  {
    label: "Solmarket Monkey Business",
    href: "#solmarket-monkey-business",
  },
  {
    label: "Solanapunks",
    href: "#solanapunks",
  },
];
