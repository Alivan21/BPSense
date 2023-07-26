"use client";
import { ComponentType } from "react";
import { useAuthContext } from "@/utils/providers/AuthProvider";

export function withGuardAdmin(Component: ComponentType) {
  return function GuardedRoute() {
    const { isLoggedIn, isAdmin } = useAuthContext();

    if (!isLoggedIn || !isAdmin) {
      return window.location.replace("/");
    }

    return <Component />;
  };
}
