import { API_URL, BaseResponse } from "@/utils/constant";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface IOfficerStore {
  nip: string;
  name: string;
  birth_date: string;
}

export interface IOfficer {
  id: number;
  nip: string;
  name: string;
  birth_date: string;
  status: number;
  qrcode: string;
  profile: string;
  email: string;
  phone: string;
  role: string;
  images: [];
}

export function useGetDataDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const { data } = await axios.get<BaseResponse<any>>(`${API_URL}/dashboard/`);
      return data;
    },
  });
}

export function useGetDataOfficer() {
  return useQuery({
    queryKey: ["officer"],
    queryFn: async () => {
      const { data } = await axios.get<BaseResponse<any>>(`${API_URL}/dashboard/officer/`);
      return data;
    },
  });
}

export function useCreateDataOfficer(props: IOfficerStore) {
  const queryClient = useQueryClient();
  const formData = new FormData();
  formData.set("name", props.name);
  formData.set("nip", props.nip);
  formData.set("birth_date", props.birth_date);
  return useMutation({
    mutationFn: async () => {
      const { data } = await axios.post<BaseResponse<any>>(`${API_URL}/dashboard/officer/`, formData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["officer"] });
    },
  });
}

export function useUpdateStatusOfficer(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { data } = await axios.put<BaseResponse<any>>(
        `${API_URL}/dashboard/officer/update/status/${id}/`
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["officer"] });
    },
  });
}
