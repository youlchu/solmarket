import axios from "axios";
import { useMutation } from "react-query";

export const useBase64Image = () => {
  return useMutation(async (image: string) => {
    return (
      await axios.post(`/api/convert-image`, {
        imageUri: image,
      })
    ).data;
  }, {});
};
