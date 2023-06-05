import { Header } from "components/Header";
import { Footer } from "components/Footer";
import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  Icon,
  Image,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { PropsWithChildren } from "react";

import { UserPageIcon } from "assets/images";
import {
  DiscordIcon,
  InstagramIcon,
  TwitterIcon,
  UserProfileImage,
  YoutubeIcon,
} from "assets/icons";
import { AiOutlineCopy, AiOutlinePlus, AiOutlineGlobal } from "react-icons/ai";
import { discover } from "assets/data/users";
// import { DiscoverNFTCard } from "components/DiscoverNFTCard";
export default function Home() {
  return (
    <>
      <Header />
      <Box>
        <Image
          src={UserPageIcon.src}
          width="100%"
          height="400px"
          minWidth={{ base: "100%", md: "100%" }}
          objectFit="cover"
        />
      </Box>
      {/* 
      <Container
        padding={{ base: "0px 30px", md: "50px 115px" }}
        maxWidth="1400px"
        color="white"
        position="relative"
      >
        <Box
          color="white"
          fontSize="30px"
          position="absolute"
          top="0px"
          transform="translateY(-50%)"
          alignItems={{ base: "center", md: "flex-start" }}
        >
          <UserProfileImage />
          <Heading marginTop="40px">Yusuf.ylc</Heading>
        </Box>
        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            flexDirection={{ base: "column", md: "row" }}
            marginTop="50px"
            alignItems={{ base: "flex-end", md: "flex-start" }}
          >
            <Box></Box>
            <Box
              display="flex"
              justifyContent="space-between"
              flexDirection={{ base: "column", md: "row" }}
              marginTop="50px"
              alignItems={{
                base: "flex-end",
                md: "flex-start",
              }}
              width={{ base: "100%", sm: "auto" }}
              gap="20px 20px"
            >
              <Button
                fontSize="16px"
                fontWeight={600}
                color={"white"}
                bg={"#A259FF"}
                padding="30px 30px"
                borderRadius="20px"
                width={{ base: "100%", md: "auto", sm: "100%" }}
                _hover={{
                  bg: "#A259FF",
                }}
              >
                <Icon as={AiOutlineCopy} fontSize="2xl" marginRight="5px" />
                0xc0E3...B79C
              </Button>
              <Button
                fontSize="16px"
                fontWeight={600}
                color={"white"}
                padding="30px 30px"
                border="2px"
                borderColor={"#A259FF"}
                width={{ base: "100%", md: "auto", sm: "100%" }}
                backgroundColor="transparent"
                borderRadius="20px"
                _hover={{
                  bg: "#A259FF",
                }}
              >
                <Icon as={AiOutlinePlus} fontSize="2xl" marginRight="5px" />
                Follow
              </Button>
            </Box>
          </Box>
        </Box>
        <Box width={{ base: "100%", md: "40%" }}>
          <Grid templateColumns="1fr 1fr 1fr" marginTop="30px">
            <Box>
              <CountBox>250k+</CountBox>
              <Text>Volume</Text>
            </Box>
            <Box>
              <CountBox>100k+</CountBox>
              <Text>NFTs Sold</Text>
            </Box>
            <Box>
              <CountBox>240k+</CountBox>
              <Text>Followers</Text>
            </Box>
          </Grid>
          <Text fontSize="22px" color="#858584" marginTop="30px">
            Bio
          </Text>
          <Text fontSize="22px">
            The internet&apos;s friendliest designer kid.
          </Text>
          <Text color="#858584" fontSize="22px" marginTop="30px">
            Links
          </Text>
          <Box display={"flex"} gap="5px" marginTop="20px">
            <Icon
              as={AiOutlineGlobal}
              fontSize="2xl"
              marginTop="4px"
              marginRight="3px"
              color="gray"
            />
            <DiscordIcon />
            <YoutubeIcon />
            <TwitterIcon />
            <InstagramIcon />
          </Box>
        </Box>
      </Container>

      <Box backgroundColor="#3B3B3B" marginBottom="80px">
        <Container
          color="white"
          // padding={{ base: "0px 30px", md: "50px 115px" }}
          padding="0px"
          maxWidth="100%"
        >
          <Tabs variant="unstyled" marginTop="45px">
            <TabList
              padding="20px 0px"
              backgroundColor="#2B2B2B"
              borderTop="1px solid #858584"
            >
              <Tab width="50%">
                <Grid templateColumns="repeat(2, 1fr)">
                  <Text fontSize="22px">Created</Text>
                  <Box
                    backgroundColor="#858584"
                    marginLeft="15px"
                    borderRadius="20px"
                  >
                    <Text marginTop="5px" fontSize="16px" width="50px">
                      320
                    </Text>
                  </Box>
                </Grid>
              </Tab>
              <Tab width="50%">
                <Grid templateColumns="repeat(2, 1fr)">
                  <Text fontSize="22px">Owned</Text>
                  <Box
                    backgroundColor="#858584"
                    marginLeft="15px"
                    borderRadius="20px"
                  >
                    <Text marginTop="5px" fontSize="16px">
                      60
                    </Text>
                  </Box>
                </Grid>
              </Tab>
              <Tab width="50%">
                <Grid templateColumns="repeat(2, 1fr)">
                  <Text fontSize="22px">Collection</Text>
                  <Box
                    backgroundColor="#858584"
                    marginLeft="15px"
                    borderRadius="20px"
                  >
                    <Text marginTop="5px" fontSize="16px">
                      6
                    </Text>
                  </Box>
                </Grid>
              </Tab>
            </TabList>

            <TabPanels
              padding={{ base: "0px 30px", md: "50px 115px" }}
              maxWidth="1440px"
              margin="auto"
            >
              <TabPanel>
                <SimpleGrid
                  gap="45px"
                  rowGap="20px"
                  templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
                  color="white"
                  background="#3B3B3B"
                >
                  {discover.map((discover) => {
                    return (
                      <DiscoverNFTCard
                        key={discover.id}
                        item={discover}
                        background="#2B2B2B"
                      />
                    );
                  })}
                </SimpleGrid>
              </TabPanel>
              <TabPanel>
                <Heading>Owned</Heading>
              </TabPanel>
              <TabPanel>
                <Heading>Collections</Heading>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      </Box> */}
      <Footer />
    </>
  );
}

const CountBox = (props: PropsWithChildren) => {
  const { children } = props;
  return <Text fontSize="28px">{children}</Text>;
};
