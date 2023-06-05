import { Box, Image, Link, SimpleGrid, Text } from "@chakra-ui/react";
import { InfoIcon } from "assets/icons";

export const Information = () => {
  return (
    <Box color="white">
      <Text
        fontSize="38px"
        marginTop="80px"
        fontStyle="normal"
        fontWeight="400"
        lineHeight="120px"
      >
        How It Works
      </Text>
      <Text fontWeight="400px" fontSize="22px">
        Find Out How To Get Started
      </Text>
      <SimpleGrid
        gap="45px"
        templateColumns="repeat(auto-fill, minmax(360px, 1fr))"
        color="white"
      >
        <Box background="#3B3B3B" borderRadius="20px" marginTop="60px">
          <Image src={InfoIcon.src}></Image>
          <Box
            color="white"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <InfoIcon />
          </Box>
          <Box textAlign="center" padding={5}>
            <Text color="purple.100" fontWeight="700" fontSize="28px">
              Önce bir wallet edin
            </Text>
            <Text
              fontSize="16px"
              fontWeight="300px"
              marginTop="10px"
              marginBottom="30px"
            >
              Phantom eklentisini browsere a kurarak bir wallet edinebilirsiniz.
              phantomda adımları geçip bir hesap edinin.
            </Text>
            <Text color="purple.200">
              (Test moda almanız gerekli çünkü solmarket henüz test modunda.
              phantom eklentisini açın, ayarlardan developer settingse tıklayıp
              modu test mode yapın. )
            </Text>
          </Box>
        </Box>

        <Box background="#3B3B3B" borderRadius="20px" marginTop="60px">
          <Image src={InfoIcon.src}></Image>
          <Box
            color="white"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <InfoIcon />
          </Box>
          <Box textAlign="center" padding={5}>
            <Text color="purple.100" fontWeight="700" fontSize="28px">
              Sol edinin. Solana faucet
            </Text>
            <Text
              fontSize="16px"
              fontWeight="300px"
              marginTop="10px"
              marginBottom="30px"
            >
              Bunun için solana faucet sitesine gidip testnet içinde geçerki sol
              alabilirsiniz. aşağıda ki adresten cüzdanınıza sanal sol gönderin.
            </Text>
            <Link
              color="pink.200"
              borderBottom="1px"
              href="https://solfaucet.com/"
              isExternal
            >
              Solsolfaucet website.
            </Link>
          </Box>
        </Box>
        <Box background="#3B3B3B" borderRadius="20px" marginTop="60px">
          <Image src={InfoIcon.src}></Image>
          <Box
            color="white"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <InfoIcon />
          </Box>
          <Box textAlign="center" padding={5}>
            <Text color="purple.100" fontWeight="700" fontSize="38px">
              Gezin
            </Text>
            <Text
              fontSize="16px"
              fontWeight="300px"
              marginTop="10px"
              marginBottom="30px"
            >
              dashboarda giderek cüzdanla kaydolun. Sonra solmarketi kullanarak
              kafanıza göre takılabilirsiz.
            </Text>
          </Box>
        </Box>
      </SimpleGrid>
    </Box>
  );
};
