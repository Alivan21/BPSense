"use client";
import { useEffect, useState } from "react";
import { createContext } from "../create-context";
import { AuthJwtPayload } from "../constant";

type AuthContextValue = {
  isLoggedIn: boolean;
  isAdmin: boolean;
  token: string | undefined;
  setToken: (token: string | undefined) => void;
  jwtPayload: AuthJwtPayload | undefined;
  setJwtPayload: (jwtPayload: AuthJwtPayload | undefined) => void;
};

const [useAuthContext, AuthProviderInternal] = createContext<AuthContextValue>({
  name: "AuthContext",
});
export { useAuthContext };

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | undefined>(undefined);
  const [jwtPayload, setJwtPayload] = useState<AuthJwtPayload | undefined>(undefined);
  const isAdmin = jwtPayload?.role == "admin";

  useEffect(() => {
    if (token === undefined || token === "") {
      setJwtPayload(undefined);
      return;
    }
  }, [token]);

  return (
    <AuthProviderInternal
      value={{
        isLoggedIn: token !== undefined,
        isAdmin,
        token,
        setToken,
        jwtPayload,
        setJwtPayload,
      }}
    >
      {children}
    </AuthProviderInternal>
  );
}
