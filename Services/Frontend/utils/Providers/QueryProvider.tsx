"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { queryClientOptions } from "../constant";

interface Props {
  children: ReactNode;
}

function QueryProvider({ children }: Props) {
  const [queryClient] = useState(() => new QueryClient(queryClientOptions));
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default QueryProvider;
