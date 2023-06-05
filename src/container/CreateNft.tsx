/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { DashboardLayout } from "layouts/Dashboard";

import { Title } from "components/common/Title";
import { ReactHookFormExample } from "components/Dashboard/CreateNFT";

export const CreateNftContainer = () => {
  return (
    <DashboardLayout>
      <Title prefixColor="blue.500">Create NFT</Title>
      <ReactHookFormExample variant="circles-alt" />
    </DashboardLayout>
  );
};
