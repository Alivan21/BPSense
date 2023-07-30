"use client";
import { ComponentType, useEffect } from "react";
import { useAuthContext } from "@/utils/Providers/AuthProvider";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/spinner";

export function withGuard(Component: ComponentType) {
  return function GuardedRoute() {
    const { push } = useRouter();
    const { isLoggedIn } = useAuthContext();

    useEffect(() => {
      if (!isLoggedIn) {
        push("/");
      }
    }, [isLoggedIn]);

    if (!isLoggedIn) {
      return (
        <div className="flex justify-center items-center my-auto h-screen">
          <Spinner />
        </div>
      );
    }

    return <Component />;
  };
}
