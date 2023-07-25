import { API_URL, BaseResponse } from "@/utils/constant";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface IOfficerStore {
  nip: string;
  name: string;
  birth_date: string;
}

// export function useGetDataOfficer() {
//   const { data } = useQuery({
//     queryFn: async () => {
//       const { data } = await axios.get<BaseResponse<any>>(
//         `${API_URL}/petugas/`
//       );
//       return data as BaseResponse<any>;
//     },
//     refetchInterval: 5000,
//   });

//   return { data };
// }

// export function useCreateDataOfficer(props: IOfficerStore) {
//   const formData = new FormData();
//   formData.set("name", props.name);
//   formData.set("nip", props.nip);
//   formData.set("birth_date", props.birth_date);
//   return useMutation({
//     mutationFn: async () => {
//       const { data } = await axios.post<BaseResponse<any>>(
//         `${API_URL}/petugas/`,
//         formData
//       );
//       return data;
//     },
//   });
// }
