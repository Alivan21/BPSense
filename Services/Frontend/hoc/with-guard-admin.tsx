"use client";
import { ComponentType, useEffect } from "react";
import { useAuthContext } from "@/utils/providers/AuthProvider";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/spinner";

export function withGuardAdmin(Component: ComponentType) {
  return function GuardedRouteAdmin() {
    const { push } = useRouter();
    const { isLoggedIn, isAdmin } = useAuthContext();
    useEffect(() => {
      if (!isLoggedIn || !isAdmin) {
        push("/");
      }
    }, [isLoggedIn, isAdmin]);

    if (!isLoggedIn || !isAdmin) {
      return (
        <div className="flex justify-center items-center my-auto h-screen">
          <Spinner />
        </div>
      );
    }

    return <Component />;
  };
}
