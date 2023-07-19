import axios from "axios";
import { API_URL, BaseResponse } from "@/utils/constant";
import { useQuery } from "@tanstack/react-query";

interface IGetQuery {
  queryKey: string;
  url: string;
}

function useGetQuery(props: IGetQuery) {
  const baseURL = API_URL;
  return useQuery({
    queryKey: [props.queryKey],
    queryFn: async () => {
      const { data } = await axios.get<BaseResponse<any>>(`${baseURL}/${props.url}`);
      return data;
    },
  });
}

export default useGetQuery;
