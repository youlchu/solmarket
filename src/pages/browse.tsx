import {
  Container,
  Heading,
  Input,
  Text,
  Icon,
  InputGroup,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Grid,
  SimpleGrid,
  InputRightElement,
  Flex,
} from "@chakra-ui/react";
import { Header } from "components/Header";
import { FiSearch } from "react-icons/fi";

// import { discover } from "assets/data/users";
import { DiscoverNFTCard } from "components/DiscoverNFT/DiscoverNFTCard";
import { Footer } from "components/Footer";
import { useState } from "react";
import { useGetNFTs } from "hooks/useNFT";
import { SolShot } from "assets/images";

export default function Browse() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const { data, isLoading, isError } = useGetNFTs({});

  return (
    <>
      <Header />
      <Box
        width="100%"
        backgroundImage={SolShot.src}
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
      >
        <Container
          color="white"
          padding={{ base: "0px 30px", md: "0px 115px" }}
          maxWidth="1400px"
        >
          <Box paddingTop="300px" paddingBottom="220px">
            <Flex>
              <Heading fontSize="52px" lineHeight="110%">
                tüm nft tasarımları.
              </Heading>
              <Text
                marginLeft="300px"
                fontSize="45px"
                lineHeight="110%"
                color="#A259FF"
                p={2}
                borderRadius="20px"
                backgroundColor="gray.100"
              >
                {" "}
                SolMarket.Place
              </Text>
            </Flex>
          </Box>
        </Container>
      </Box>

      <Box backgroundColor="#3B3B3B" marginBottom="80px">
        <Container color="white" padding="0px" maxWidth="100%">
          <Tabs variant="unstyled">
            <TabList
              padding="20px 0px"
              backgroundColor="#2B2B2B"
              borderTop="1px solid #858584"
            >
              <Tab width="50%">
                <Grid templateColumns="repeat(2, 1fr)">
                  <Text fontSize="22px">NFTs</Text>
                  {/* <Box
                    backgroundColor="#858584"
                    marginLeft="15px"
                    borderRadius="20px"
                  >
                    <Text marginTop="5px" fontSize="16px" width="50px">
                      320
                    </Text>
                  </Box> */}
                </Grid>
              </Tab>
              <Tab width="50%">
                <Grid templateColumns="repeat(2, 1fr)">
                  <Text fontSize="22px">Collections</Text>
                  <Box
                    backgroundColor="#858584"
                    marginLeft="15px"
                    borderRadius="20px"
                  >
                    <Text marginTop="5px" fontSize="16px">
                      yeni
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
                  gap="5px"
                  templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
                  color="white"
                >
                  {data?.map((nft: any) => {
                    return (
                      <DiscoverNFTCard
                        key={nft.id}
                        item={nft}
                        background="#2B2B2B"
                      />
                    );
                  })}
                </SimpleGrid>
              </TabPanel>
              <TabPanel>
                <Heading color="purple">
                  Bu alan eklenince çok şaşıracaksın !!!
                </Heading>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
