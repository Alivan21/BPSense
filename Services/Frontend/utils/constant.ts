export const queryClientOptions = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
};

export type BaseResponse<T> = {
  code: number;
  data?: T;
  message?: string;
};

export type AuthJwtPayload = {
  sub: string;
  exp: string;
  role: string;
};

export const API_URL = process.env.NEXT_PUBLIC_API_BACKEND;
