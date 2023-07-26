import { API_URL, BaseResponse } from "@/utils/constant";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export interface ISearchCode {
  nip: string;
  birth_date: string;
}

export function useSearchCode(props: ISearchCode) {
  const formData = new FormData();
  formData.set("nip", props.nip);
  formData.set("birth_date", props.birth_date);
  return useMutation({
    mutationFn: async () => {
      const { data } = await axios.post<BaseResponse<any>>(`${API_URL}/user/search`, formData);
      return data;
    },
  });
}
