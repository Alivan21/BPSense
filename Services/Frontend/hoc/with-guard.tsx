"use client";
import { ComponentType } from "react";
import { useAuthContext } from "@/utils/providers/AuthProvider";

export function withGuard(Component: ComponentType) {
  return function GuardedRoute() {
    const { isLoggedIn } = useAuthContext();

    if (!isLoggedIn) {
      return window.location.replace("/");
    }

    return <Component />;
  };
}
