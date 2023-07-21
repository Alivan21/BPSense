"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useState } from "react";
import { queryClientOptions } from "../constant";

interface Props {
  children: ReactNode;
}

function QueryProvider({ children }: Props) {
  const [queryClient] = useState(() => new QueryClient(queryClientOptions));
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default QueryProvider;
