import { BaseResponse, API_URL } from "@/utils/constant";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { IOfficer } from "./admin";

export function useGetOfficer() {
  return useMutation({
    mutationKey: ["officer-profile"],
    mutationFn: async () => {
      const { data } = await axios.post<BaseResponse<IOfficer>>(`${API_URL}/auth/get-profile`);
      return data.data;
    },
  });
}
