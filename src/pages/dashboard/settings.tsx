import {
  Box,
  Heading,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { DashboardLayout } from "layouts/Dashboard";
import { Title } from "components/common/Title";
import { useForm } from "react-hook-form";

export default function CreateNFT() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => console.log(data);

  return (
    <DashboardLayout>
      <Box width="100%">
        <Title prefixColor="blue.500">Settings</Title>
        <Heading size="lg" sx={{ mt: 8 }}>
          You can change your username here!
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel mt={4}>User Name</FormLabel>
            <Input
              width="50%"
              placeholder="User Name"
              {...register("username", { required: true })}
            />
          </FormControl>
          <Box width="50%" display="flex" justifyContent="end">
            <Button mt={4} type="submit">
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </DashboardLayout>
  );
}
