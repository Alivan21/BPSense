import { API_URL, BaseResponse } from "@/utils/constant";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface IOfficerStore {
  nip: string;
  name: string;
  birth_date: string;
}

export interface Officer {
  id: number;
  nip: string;
  name: string;
  birth_date: string;
  status: number;
  qrcode: string | null;
  profile: string | null;
  email: string | null;
  phone: string | null;
  role: string;
  images: string[];
}

export function useGetDataDashboard() {
  const { data, isLoading } = useQuery({
    // queryKey: ["officer"],
    queryFn: async () => {
      const { data } = await axios.get<BaseResponse<any>>(`${API_URL}/`);
      return data;
    },
    refetchInterval: 10000,
  });

  return { data, isLoading };
}
export function useGetDataOfficer() {
  const { data, isLoading } = useQuery({
    queryKey: ["officer"],
    queryFn: async () => {
      const { data } = await axios.get<BaseResponse<any>>(
        `${API_URL}/petugas/`
      );
      return data;
    },
    refetchInterval: 10000,
  });

  return { data, isLoading };
}

export function useCreateDataOfficer(props: IOfficerStore) {
  const formData = new FormData();
  formData.set("name", props.name);
  formData.set("nip", props.nip);
  formData.set("birth_date", props.birth_date);
  return useMutation({
    mutationKey: ["officer"],
    mutationFn: async () => {
      const { data } = await axios.post<BaseResponse<any>>(
        `${API_URL}/petugas/`,
        formData
      );
      return data;
    },
  });
}

export function useUpdateStatusOfficer(id: number) {
  return useMutation({
    mutationKey: ["officer"],
    mutationFn: async () => {
      const { data } = await axios.put<BaseResponse<any>>(
        `${API_URL}/petugas/update/status/${id}`
      );
      return data;
    },
  });
}
