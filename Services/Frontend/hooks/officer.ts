import { API_URL, BaseResponse } from "@/utils/constant";
import { useAuthContext } from "@/utils/providers/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export interface IOfficer {
  id: number;
  nip: string;
  name: string;
  birth_date: string;
  status: boolean;
  qrcode: string;
  profile: string;
  email: string;
  phone: string;
  role: string;
  images: [];
}

export function useGetOfficer() {
  const { token } = useAuthContext();
  return useMutation({
    mutationKey: ["officer-profile"],
    mutationFn: async () => {
      const { data } = await axios.post<BaseResponse<IOfficer>>(`${API_URL}/auth/get-profile`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      return data.data;
    },
  });
}
