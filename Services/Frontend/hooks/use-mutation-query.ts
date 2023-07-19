import axios from "axios";
import { API_URL } from "@/utils/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface IMutationQuery {
  mutationKey: string;
  url: string;
}

function useMutationQuery(props: IMutationQuery) {
  const queryClient = useQueryClient();
  const baseURL = API_URL;
  return useMutation({
    mutationFn: async () => {
      await axios.post(`${baseURL}/${props.url}`);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries([props.mutationKey]);
    },
  });
}

export default useMutationQuery;
