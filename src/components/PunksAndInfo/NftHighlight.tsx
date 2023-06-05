import { Box, Button, SimpleGrid, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { Seeall } from "assets/icons";
import { AvatarIcon } from "assets/icons";
import { NftInfoImage } from "assets/images";
import Countdown from "react-countdown";

export const NftHighlight = () => {
  const endDate = new Date(2023, 11, 31, 23, 59, 59);

  const StyledBox = styled(Box)`
    background-image: url(${NftInfoImage.src});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    text-align: start;
    height: 840px;
  `;

  return (
    <Box marginTop="80px">
      <StyledBox paddingTop="360px" paddingStart="115px">
        <SimpleGrid
          display="flex"
          justifyContent="space-between"
          templateColumns="repeat(auto-fill, minmax(720px, 1fr))"
        >
          <Box>
            <Box
              display="flex"
              bg="#3B3B3B"
              maxWidth="151px"
              padding={2}
              borderRadius="20px"
            >
              <AvatarIcon />
              <Text marginLeft="8px" fontWeight="thin" color="white">
                Nft owner
              </Text>
            </Box>
            <Text
              color="white"
              fontSize="51px"
              lineHeight="110%"
              fontWeight="400"
              marginTop="20px"
              fontStyle={"thin"}
            >
              Magic Mashrooms
            </Text>
            <Button bg="white" padding="22px 50px" marginTop="30px">
              <Seeall />
              <Text marginLeft="10px">See All</Text>
            </Button>
          </Box>
          <Box
            fontSize="22px"
            color="white"
            marginTop="50px"
            marginRight="115px"
            width="295px"
            height="144px"
            bgColor={"rgba(59, 59, 59, 0.7);"}
            borderRadius="20px"
          >
            <Text fontSize="12px" padding="0px 30px" paddingTop="30px">
              Auction ends in:
            </Text>
            <Box display="flex" justifyContent="space-between" padding="15px">
              <Countdown
                date={endDate}
                renderer={({ hours, minutes, seconds }) => (
                  <>
                    <Box>
                      <Text fontSize="38px">{hours}</Text>
                      <Text fontSize="13px">hours</Text>
                    </Box>
                    <Text fontSize="38px">:</Text>
                    <Box>
                      <Text fontSize="38px">{minutes}</Text>
                      <Text fontSize="13px">minutes</Text>
                    </Box>
                    <Text fontSize="38px">:</Text>
                    <Box>
                      <Text fontSize="38px">{seconds}</Text>
                      <Text fontSize="13px">seconds</Text>
                    </Box>
                  </>
                )}
              />

              {/* <Box>
                <Text fontSize="38px">59</Text>
                <Text fontSize="13px">minutes</Text>
              </Box>
              <Text fontSize="38px">:</Text>
              <Box>
                <Text fontSize="38px">59</Text>
                <Text fontSize="13px">minutes</Text>
              </Box>
              <Text fontSize="38px">:</Text>
              <Box>
                <Text fontSize="38px">59</Text>
                <Text fontSize="13px">minutes</Text>
              </Box> */}
            </Box>
          </Box>
        </SimpleGrid>
      </StyledBox>
    </Box>
  );
};
