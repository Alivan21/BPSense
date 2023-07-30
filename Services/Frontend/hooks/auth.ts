import { API_URL, AuthJwtPayload, BaseResponse } from "@/utils/constant";
import { decodeJwt } from "@/utils/jwt";
import { useAuthContext } from "@/utils/Providers/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

export interface ISignIn {
  identifier: string;
  password: string;
}

interface IAuthResponse {
  token: string;
  expires_at: string;
}

export function useSignIn(props: ISignIn) {
  const { setToken, setJwtPayload } = useAuthContext();
  const formData = new FormData();
  formData.set("identifier", props.identifier);
  formData.set("password", props.password);
  return useMutation({
    mutationFn: async () => {
      const { data } = await axios.post<BaseResponse<IAuthResponse>>(
        `${API_URL}/auth/login`,
        formData
      );
      if (data.data === undefined) return;

      setToken(data.data.token);
      axios.defaults.headers.common.Authorization = `Bearer ${data.data.token}`;
      const decoded = decodeJwt<AuthJwtPayload>(data.data.token);
      setJwtPayload(decoded);
    },
  });
}

export function useSignOut() {
  const { setToken } = useAuthContext();
  const router = useRouter();
  return useMutation({
    mutationFn: async () => {
      await axios.post(`${API_URL}/auth/logout`);
      delete axios.defaults.headers.common.Authorization;
    },
    onSuccess() {
      setToken(undefined);
      router.push("/");
    },
  });
}
