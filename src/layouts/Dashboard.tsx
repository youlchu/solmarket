/* eslint-disable @next/next/no-page-custom-font */
import { Container, Text } from "@chakra-ui/react";

import { SidebarWithHeader } from "components/Dashboard/SidebarWithHeader";
import Head from "next/head";
import { PropsWithChildren } from "react";
import { dashboardTheme } from "../theme";
import { useWallet } from "@solana/wallet-adapter-react";

export const DashboardLayout = (props: PropsWithChildren<{}>) => {
  const { children } = props;
  const { publicKey } = useWallet();
  return (
    <>
      <Head>
        <title>solmarket</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Container maxW="100%" padding="0">
        <SidebarWithHeader>
          {!publicKey && (
            <>
              <Text>To use this app, you need to connect your wallet.</Text>
            </>
          )}
          {publicKey && children}
        </SidebarWithHeader>
      </Container>
    </>
  );
};
