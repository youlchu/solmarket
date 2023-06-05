/* eslint-disable @next/next/no-page-custom-font */
import React from "react";

import { Container } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Head from "next/head";
import { PropsWithChildren } from "react";
import { SidebarWithHeader } from "../components/Dashboard/SidebarWithHeader";

export const DashboardLayout = (props: PropsWithChildren<{}>) => {
  const { children } = props;
  return (
    <>
      <Head>
        <title>solmarket</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <SidebarWithHeader>{children}</SidebarWithHeader>
      <Container maxW="100%" padding="0"></Container>
    </>
  );
};
